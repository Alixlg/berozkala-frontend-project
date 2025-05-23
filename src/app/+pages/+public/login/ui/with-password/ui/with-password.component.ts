import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { delay, Observable, pipe } from 'rxjs';
import { AlertService } from '../../../../../../+components/alert-system/service/alert.service';
import { LoginService } from '../../../service/login.service';
import { Login } from '../../../models/login.model';

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

      result.subscribe(r => { //yaani har vaght javab result omad in code ejra mishavad va ta un moghe baghie code be kar khod edame mide !
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
