import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modals/user.modal';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private $http: HttpService
  ) { }

  getUserList(
    page: number = 1,
    pageSize: number,
    sort: string,
    search?: string): Observable<UserList> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());
    params = params.set('sort', sort);
    if (search) {
      params = params.set('search', search);
    }
    return this.$http.get('users', params);
  }

  deleteUser(userId: string): Observable<{ message: string, status: number }> {
    return this.$http.delete(`delete-user/${userId}`);
  }

  toggleStatusOfUser(userId: string): Observable<{ status: number, message: string, user: User }> {
    return this.$http.put(`toggle-status/${userId}`, '');
  }
}

// interface UserList {
//   'users': User[];
//   'totalNumber': number;
//   'perPage': number;
//   'currentPage': number;
//   'firstPage': number;
//   'isEmpty': boolean;
//   'totalPages': number;
//   'lastPage': number;
//   'hasMorePages': boolean;
//   'hasPages': boolean;
// };

interface UserList {
  'users': {
    'meta': {
      'total': number;
      'per_page': number;
      'current_page': number;
      'last_page': number;
      'first_page': number;
    };
    'data': User[];
  }
}
