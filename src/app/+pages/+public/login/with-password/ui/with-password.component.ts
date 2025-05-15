import { Component, inject } from '@angular/core';
import { AlertService } from '../../../../../+services/alert.service';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../models/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../../+services/login.service';
import { delay, Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-with-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './with-password.component.html',
  styleUrl: './with-password.component.css'
})
export class WithPasswordComponent {
  router = inject(Router);
  alertObj = inject(AlertService);
  loginAuth = inject(LoginService);

  isErrorStyle = false;
  isBussy = false;

  loginModel: Login = { username: '', password: '', keepMe: false };

  login() {
    this.isBussy = true;

    if (this.loginModel.username.length >= 2 && this.loginModel.password.length >= 8) {

      let result = this.loginAuth.checkUser(this.loginModel.username, this.loginModel.password);

      result.subscribe(r => {
        if (r) {
          this.isErrorStyle = false;
          
          if (!r.isActive) {
            this.alertObj.newAlert("اکانت شما به دلایلی مسدود شده لطفا با مدیریت تماس بگیرید", 3000, true);
            this.isBussy = false;
            return;
          }
          else {
            this.alertObj.newAlert("شما با موفقیت وارد شدید در حال انتقال . . ", 3000);
          }

          if (r?.isAdmin) {
            this.router.navigateByUrl('/admin-panel');
          }
          else {
            this.router.navigateByUrl('/user-panel');
          }
        }
        else {
          this.isErrorStyle = true;
          this.alertObj.newAlert("رمز عبور یا نام کاربری اشتباه است", 2500, false, true);
        }
        this.isBussy = false;
      });
    }
    else {
      setTimeout(() => {
        this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2500, false, true);
        this.isErrorStyle = true;
        this.isBussy = false;
      }, 2000);
    }
  }
}
