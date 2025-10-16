import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../+components/alert-system/service/alert.service';
import { MemberSignUp, MemberSignUpModel } from '../models/register';
import { BackendService } from '../../../../+shared/services/backend.service';
import { AccountService } from '../../../../+shared/services/account.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  alertObj = inject(AlertService);
  backendService = inject(BackendService);
  accountService = inject(AccountService);

  singUp: MemberSignUp = { userName: '', passWord: '', phoneNumber: '', appRules: false };

  isUsernameValid = true;
  isPasswordValid = true;
  isPhoneValid = true;

  isBussy = false;
  isCodeSended = true;

  register() {
    this.isBussy = true;

    if (this.singUp.userName == '' || this.singUp.userName.length < 5) {
      this.isUsernameValid = false;
      this.isBussy = false;
      return;
    } else {
      this.isUsernameValid = true;
    }

    if (this.singUp.passWord == '' || this.singUp.userName.length < 5) {
      this.isPasswordValid = false;
      this.isBussy = false;
      return;
    } else {
      this.isPasswordValid = true;
    }

    if (!Number(this.singUp.phoneNumber) || !this.singUp.phoneNumber.includes('09') || this.singUp.phoneNumber.length <= 10) {
      this.isPhoneValid = false;
      this.isBussy = false;
      return;
    } else {
      this.isPhoneValid = true;
    }

    if (this.singUp.appRules == false) {
      this.alertObj.newAlert("لطفا تیک گزینه قوانین را بزنید", 2000, false, true);
      this.isBussy = false;
      return;
    }

    let body: MemberSignUpModel = {
      userName: this.singUp.userName,
      passWord: this.singUp.passWord,
      phoneNumber: this.singUp.phoneNumber
    }

    let result = this.backendService.post<string, MemberSignUpModel>('api/v1/auth/member/singup', body);

    result.subscribe({
      next: res => {
        if (res.isSuccess && (res.body != null || undefined)) {
          localStorage.removeItem('token');
          localStorage.setItem('token', res.body);

          this.accountService.setAccount().subscribe({
            next: res => {
              if (res.isSuccess) {
                this.alertObj.newAlert("شما با موفقیت ثبت نام کردید ! در حال انتقال . . ", 2000, false, false, true);
                this.router.navigateByUrl('/user-panel');
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
        this.isBussy = false;
      },
      error: err => {
        this.isBussy = false;
      }
    });
  }

  validateCode() {
    this.alertObj.newAlert("شما با موفقیت ثبت نام کردید ! در حال انتقال . . ", 2000, false, false, true);
    this.router.navigateByUrl('/user-panel');
  }
}
