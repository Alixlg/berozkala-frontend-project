import { Component, Input, input } from '@angular/core';
import { LoginAction } from '../enums/login-action';
import { WithPasswordComponent } from "./with-password/ui/with-password.component";
import { WithVerifyCodeComponent } from "./with-verify-code/ui/with-verify-code.component";
import { ForgetPasswordComponent } from "./forget-password/ui/forget-password.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base-login',
  imports: [RouterLink, WithPasswordComponent, WithVerifyCodeComponent, ForgetPasswordComponent],
  templateUrl: './base-login.component.html',
  styleUrl: './base-login.component.css'
})
export class BaseLoginComponent {
  @Input() routePanelAdrress = '';

  @Input() loginWithUsernameApi = '';
  @Input() loginWithCodeApi = '';
  @Input() validateCodeApi = '';

  @Input() isAdmin = false;

  loginAction = LoginAction;
  currentAction = LoginAction.loginWithUsername;
}
