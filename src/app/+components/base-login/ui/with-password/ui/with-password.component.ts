import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../alert-system/service/alert.service';
import { LoginWithUsername, LoginWithUsernameModel } from '../../../models/login.model';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { LoginAction } from '../../../enums/login-action';
import { AccountService } from '../../../../../+shared/services/account.service';

@Component({
  selector: 'app-with-password',
  imports: [FormsModule],
  templateUrl: './with-password.component.html',
  styleUrl: './with-password.component.css'
})
export class WithPasswordComponent {
  router = inject(Router);
  alertObj = inject(AlertService);
  backendService = inject(BackendService);
  accountService = inject(AccountService);

  isPasswordWrong = false;
  isUserNameWrong = false;
  isBussy = false;

  @Input() routePanelAdrress = '';
  @Input() loginWithUsernameApi = '';
  @Input() isAdmin = false;

  loginAction = LoginAction;
  @Output() onChangeAction = new EventEmitter<LoginAction>();

  loginModel: LoginWithUsername = { username: '', password: '', keepMe: false };

  login() {
    this.isBussy = true;

    if (this.loginModel.username.length >= 2 && this.loginModel.password.length >= 4) {
      let body: LoginWithUsernameModel = {
        userName: this.loginModel.username,
        password: this.loginModel.password
      };

      let result = this.backendService.post<string, LoginWithUsernameModel>(this.loginWithUsernameApi, body);;

      result.subscribe({
        next: res => {
          if (res.isSuccess && (res.body != null || undefined)) {
            this.isPasswordWrong = false;
            this.isUserNameWrong = false;

            if (this.loginModel.keepMe) {
              localStorage.removeItem('token');
              localStorage.setItem("token", res.body);
            }
            else {
              sessionStorage.removeItem('token');
              sessionStorage.setItem("token", res.body);
            }

            this.accountService.setAccount().subscribe({
              next: res => {
                if (res.isSuccess) {
                  this.alertObj.newAlert("شما با موفقیت وارد شدید در حال انتقال . . ", 3000);
                  this.router.navigateByUrl(this.routePanelAdrress);
                } else {
                  localStorage.removeItem('token');
                  sessionStorage.removeItem('token');
                  this.alertObj.newAlert("خطا در انجام پردازش لطفا دوباره امتحان کنید", 3000, false, true);
                }
                this.isBussy = false;
              },
              error: err => this.isBussy = false
            });
          }
          else {
            if (res.message == "پسورد اشتباه است") {
              this.isPasswordWrong = true;
              this.isUserNameWrong = false;
            } else if (res.message == "یوزر نیم اشتباه است") {
              this.isUserNameWrong = true;
              this.isPasswordWrong = true;
            }
            this.isBussy = false;
          }
        },
        error: err => {
          this.isBussy = false;
        }
      });
    }
    else {
      this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2500, false, true);
      this.isPasswordWrong = true;
      this.isUserNameWrong = true;
      this.isBussy = false;
    }
  }
}
