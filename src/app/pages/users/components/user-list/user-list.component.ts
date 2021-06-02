import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { from, fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { User } from 'src/app/modals/user.modal';
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
    private $userService: UserService
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
      this.search
    ).subscribe(data => {
      this.users = data.users;
      this.totalUser = data.perPage * (data.totalPages - 1) + data.totalNumber;
    });
  }

  private onSearch(): void {
    this.searchElement = document.getElementById('search');
    fromEvent<any>(this.searchElement, 'input').pipe(
      debounceTime(500),
    ).subscribe(event => {
      this.search = event.target.value;
      this.page = 1;
      this.getUserList();
    });
  }


  pageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.getUserList();
  }

  sortChange(sort: Sort): void {
    console.log(sort);
    const sortBy = sort.active;
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

  }

}
