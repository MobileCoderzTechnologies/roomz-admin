import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FORGOT_PASSWORD_ROUTE } from 'src/app/constants/route.constants';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forgotPasswordRoute = FORGOT_PASSWORD_ROUTE;
  loginForm: FormGroup = this.$loginService.loginForm();
  isLoading = false;
  constructor(
    private $router: Router,
    private $loginService: LoginService,
    private $alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = this.loginForm.value;
    this.isLoading = true;
    this.$loginService.logIn(loginData).subscribe(data => {
      const accessToken = data.data.accessToken.token;
      localStorage.setItem('adminAccessToken', accessToken);
      this.isLoading = false;
      this.$router.navigateByUrl('/');
    }, err => {
      this.isLoading = false;
    });
  }

}
