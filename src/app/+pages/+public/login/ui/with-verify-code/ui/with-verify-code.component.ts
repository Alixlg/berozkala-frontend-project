import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../../+components/alert-system/service/alert.service';


@Component({
  selector: 'app-with-verify-code',
  imports: [FormsModule, RouterLink],
  templateUrl: './with-verify-code.component.html',
  styleUrl: './with-verify-code.component.css'
})
export class WithVerifyCodeComponent {
  alertObj = inject(AlertService);

  isErrorStyle = false;
  isBussy = false;
  isCodeSended = false;

  phoneNumber = '';

  sendVerifyCode() {
    if (Number(this.phoneNumber) && this.phoneNumber.includes('09')) {
      this.isBussy = true;

      setTimeout(() => {
        this.alertObj.newAlert("کد به شماره شما با موفقیت ارسال شد", 2000);
        this.isCodeSended = true;
        this.isErrorStyle = false;
        this.isBussy = false;
      }, 1500);
    }
    else {
      this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2000, false, true);
      this.isErrorStyle = true;
      this.isBussy = false;
    }
  }

  validateCode() {
    throw new Error('Method not implemented.');
  }
}
