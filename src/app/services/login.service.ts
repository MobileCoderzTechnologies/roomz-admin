import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Admin } from '../modals/admin.modal';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private $http: HttpService,
    private $fb: FormBuilder
  ) { }

  loginForm(): FormGroup {
    return this.$fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  logIn(data: { email: string; password: string }): Observable<LoginResp> {
    return this.$http.post('login', data);
  }

  changePassword(data: { old_password: string; new_password: string; confirm_password: string }): Observable<{ message: string }> {
    return this.$http.post('change_password', data);
  }
}



interface LoginResp {
  message: string;
  data: {
    admin: Admin,
    accessToken: {
      type: string,
      token: string,
      refreshToken: string | null;
    }
  };
}
