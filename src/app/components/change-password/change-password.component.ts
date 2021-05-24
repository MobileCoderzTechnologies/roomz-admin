import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE } from 'src/app/constants/route.constants';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup = new FormGroup({
    old_password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(7)]),
    new_password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(7)]),
    confirm_password: new FormControl('', [Validators.required])
  },
    { validators: [this.matchPasswords('new_password', 'confirm_password')] }
  );
  constructor(
    private $loginService: LoginService,
    private $router: Router,
    private $alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const passwordData = this.changePasswordForm.value;
    this.$loginService.changePassword(passwordData).subscribe(data => {
      console.log(data);
      this.changePasswordForm.reset();
      this.$alert.success(data.message);
      this.$router.navigate([DASHBOARD_ROUTE.url]);
    });
  }

  private matchPasswords(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
