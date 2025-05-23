import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../+components/alert-system/service/alert.service';
import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  router = inject(Router);
  alertObj = inject(AlertService);

  registerModel: Register = { username: '', password: '', phone: '', appRules: false };

  isUsernameValid = true;
  isPasswordValid = true;
  isPhoneValid = true;

  isBussy = false;
  isCodeSended = false;

  register() {

    if (this.registerModel.username == '') {
      this.isUsernameValid = false;
      this.isBussy = false;
    }

    if (this.registerModel.password == '') {
      this.isPasswordValid = false;
      this.isBussy = false;
    }

    if (!Number(this.registerModel.phone) || !this.registerModel.phone.includes('09') || this.registerModel.phone.length <= 10) {
      this.isPhoneValid = false;
      this.isBussy = false;
    }

    if (this.registerModel.appRules == false) {
      this.alertObj.newAlert("لطفا تیک گزینه قوانین را بزنید", 2000, false, true);
      this.isBussy = false;
    }


    if (Number(this.registerModel.phone) && this.registerModel.phone.includes('09') && this.registerModel.username != '' && this.registerModel.password != '' && this.registerModel.appRules == true) {
      this.isBussy = true;
      this.isUsernameValid = true;
      this.isPasswordValid = true;
      this.isPhoneValid = true;

      setTimeout(() => {
        this.alertObj.newAlert("اطلاعات شما صحیح است و کد برای شما ارسال شد", 2000);
        this.isCodeSended = true;
        this.isBussy = false;
      }, 2500);
    }
  }

  validateCode() {
    this.alertObj.newAlert("شما با موفقیت ثبت نام کردید ! در حال انتقال . . ", 2000, false, false, true);
    this.router.navigateByUrl('/user-panel');
  }
}
