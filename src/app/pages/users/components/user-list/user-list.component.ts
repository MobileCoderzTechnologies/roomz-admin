import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { User } from 'src/app/modals/user.modal';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  users: User[];
  totalUser = 1;

  columnToDisplay = ['sn', 'image', 'name', 'email', 'isVerified', 'moreInfo', 'action'];
  page = 1;
  limit = 10;
  sort = '';
  search = '';

  isLoading = false;



  searchElement: HTMLElement;
  constructor(
    private $userService: UserService,
    private $alert: AlertService,
    private $dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
    this.isLoading = true;
    this.$userService.getUserList(
      this.page,
      this.limit,
      this.sort,
      this.search
    ).subscribe(data => {
      this.users = data.users.data;
      this.users = this.users.map(e => {
        e.is_active = Boolean(e.is_active);
        return e;
      });
      this.totalUser = data.users.meta.total;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }


  onSearch(search: string): void{
    this.search = search;
    this.getUserList();
  }

  pageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getUserList();
  }

  sortChange(sort: Sort): void {
    let sortBy = sort.active;
    if (sortBy === 'name') {
      sortBy = 'first_name';
    }
    if (sort.direction === 'asc') {
      this.sort = sortBy;
    } else if (sort.direction === 'desc') {
      this.sort = `-${sortBy}`;
    } else {
      return;
    }
    this.getUserList();
  }

  statusChange(isActive: boolean, userId: string): void {
    this.$userService.toggleStatusOfUser(userId).subscribe(data => {
      this.$alert.success(data.message);
      this.getUserList();
      console.log(data);
    });
  }

  deleteUser(userId: string): void {
    this.$dialogService.confirm(
      (status) => {
        if (status) {
          this.deleting(userId);
        }
      },
      'Are You Sure?',
      'It will permanently deleted !'
    );
  }

  deleting(userId: string): void {
    this.$userService.deleteUser(userId).subscribe(data => {
      this.$alert.info(data.message);
      this.getUserList();
    });
  }

}
