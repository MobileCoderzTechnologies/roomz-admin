import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { from, fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { User } from 'src/app/modals/user.modal';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {


  users: User[];
  totalUser = 0;

  columnToDisplay = ['sn', 'image', 'name', 'email', 'isVerified', 'moreInfo', 'action'];
  page = 1;
  limit = 10;
  sort = '';
  search = '';



  searchElement: HTMLElement;
  constructor(
    private $userService: UserService,
    private $alert: AlertService,
    private $dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  ngAfterViewInit(): void {
    this.onSearch();
  }

  private getUserList(): void {
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
    });
  }

  private onSearch(): void {
    this.searchElement = document.getElementById('search');
    fromEvent<any>(this.searchElement, 'input').pipe(
      debounceTime(500),
    ).subscribe(event => {
      this.search = event.target.value;
      this.page = 1;
      if (this.search && this.search.trim()) {
        this.getUserList();
      }
      if (!this.search) {
        this.getUserList();
      }
    });
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
          this.deleteUser(userId);
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
