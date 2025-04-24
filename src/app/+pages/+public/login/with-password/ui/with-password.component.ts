import { Component, inject } from '@angular/core';
import { AlertService } from '../../../../../+services/alert.service';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../models/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-with-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './with-password.component.html',
  styleUrl: './with-password.component.css'
})
export class WithPasswordComponent {
  router = inject(Router);
  alertObj = inject(AlertService);
  isErrorStyle = false;
  isBussy = false;

  loginModel: Login = { username: '', password: '', keepMe: false };

  login() {
    this.isBussy = true;

    if (this.loginModel.username.length >= 2 && this.loginModel.password.length >= 8) {
      if (this.loginModel.username == "admin" && this.loginModel.password == "12345678") {
        this.alertObj.newAlert("شما با موفقیت وارد شدید در حال انتقال . . ", 3000);
        this.isErrorStyle = false;

        setTimeout(() => {
          this.router.navigateByUrl('/admin-panel');
          this.isBussy = false;
        }, 2500);
      }
      else if (this.loginModel.username == "user" && this.loginModel.password == "12345678") {
        this.alertObj.newAlert("شما با موفقیت وارد شدید در حال انتقال . . ", 3000);
        this.isErrorStyle = false;

        setTimeout(() => {
          this.router.navigateByUrl('/user-panel');
          this.isBussy = false;
        }, 2500);
      }
      else {
        setTimeout(() => {
          this.alertObj.newAlert("رمز عبور یا نام کاربری اشتباه است", 2500, false, true);
          this.isErrorStyle = true;
          this.isBussy = false;
        }, 1500);
      }
    }
    else {
      setTimeout(() => {
        this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2500, false, true);
        this.isErrorStyle = true;
        this.isBussy = false;
      }, 1500);
    }
  }
}
