import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../alert-system/service/alert.service';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { LoginWithCodeModel, SubmitCodeModel } from '../../../models/login.model';
import { LoginAction } from '../../../enums/login-action';
import { RequestResultModel } from '../../../../../+shared/models/requestResult.model';

@Component({
  selector: 'app-with-verify-code',
  imports: [FormsModule],
  templateUrl: './with-verify-code.component.html',
  styleUrl: './with-verify-code.component.css'
})
export class WithVerifyCodeComponent {
  alertObj = inject(AlertService);
  backendService = inject(BackendService);
  router = inject(Router);

  isErrorStyle = false;
  isBussy = false;
  isCodeSended = false;

  @Input() routePanelAdrress = '';
  @Input() loginWithCodeApi = '';
  @Input() validateCodeApi = '';

  loginAction = LoginAction;
  @Output() onChangeAction = new EventEmitter<LoginAction>();

  loginModel: LoginWithCodeModel = {
    phoneNumber: ''
  };
  optCode = [];

  sendVerifyCode() {
    if (Number(this.loginModel.phoneNumber) && this.loginModel.phoneNumber.includes('09')) {
      this.isBussy = true;

      let result = this.backendService.post<number, LoginWithCodeModel>(this.loginWithCodeApi, this.loginModel);
      result.subscribe({
        next: res => {
          if (res.isSuccess) {
            this.alertObj.newAlert("کد به شماره شما با موفقیت ارسال شد", 2000);
            this.isErrorStyle = false;
            this.isBussy = false;
            this.isCodeSended = true;
          } else {
            this.isErrorStyle = true;
            this.isBussy = false;
          }
        },
        error: err => {
          this.isBussy = false;
        }
      });
    }
    else {
      this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2000, false, true);
      this.isErrorStyle = true;
      this.isBussy = false;
    }
  }

  validateCode() {
    this.isBussy = true;

    let optCode = '';
    this.optCode.forEach(x => optCode += x);

    let body: SubmitCodeModel = {
      phoneNumber: this.loginModel.phoneNumber,
      optCode: Number(optCode)
    };

    let result = this.backendService.post<string, SubmitCodeModel>(this.validateCodeApi, body);

    result.subscribe({
      next: res => {
        if (res.isSuccess && (res.body != null || undefined)) {
          localStorage.clear();
          localStorage.setItem('token', res.body);

          this.alertObj.newAlert("شما با موفقیت وارد شدید در حال انتقال . . ", 3000);
          this.router.navigateByUrl(this.routePanelAdrress);
        }
        this.isBussy = false;
      },
      error: err => {
        this.isBussy = false;
      }
    });
  }
}
