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

  getUserList(page: number = 1, search?: string): Observable<UserList> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    if (search) {
      params = params.set('search', search);
    }
    return this.$http.get('users-list', params);
  }
}

interface UserList {
  'users': User[];
  'totalNumber': number;
  'perPage': number;
  'currentPage': number;
  'firstPage': number;
  'isEmpty': boolean;
  'totalPages': number;
  'lastPage': number;
  'hasMorePages': boolean;
  'hasPages': boolean;
}
