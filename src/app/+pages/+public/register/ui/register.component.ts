import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../+services/alert.service';
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

  registerModel: Register = { username: '', password: '', email: '', phone: '', appRules: false };
  
  isUsernameValid = true;
  isPasswordValid = true;
  isEmailValid = true;
  isPhoneValid = true;

  isbussy = false;

  singUp() {
    // if (this.emailorPhone.includes('@gmail.com') || this.emailorPhone.includes('gmail@.com')) {
    //   this.alertObj.newAlert("شما با موفقیت ثبت نام کردید ! در حال انتقال . . ", 2000, false, false, true);
    //   this.registerModel.email = this.emailorPhone;

    //   setTimeout(() => {
    //     this.router.navigateByUrl('/pr/user-panel');
    //   }, 1500);
    // }
    // else if (Number(this.emailorPhone) && this.emailorPhone.includes('09')) {
    //   this.alertObj.newAlert("شما با موفقیت ثبت نام کردید ! در حال انتقال . . ", 2000, false, false, true);
    //   this.registerModel.phone = this.emailorPhone;

    //   setTimeout(() => {
    //     this.router.navigateByUrl('/pr/user-panel');
    //   }, 1500);
    // }
    // else {
    //   this.alertObj.newAlert("لطفا مقادیر خواسته شده را به درستی وارد کنید", 2000, false, true);
    // }
  }
}
