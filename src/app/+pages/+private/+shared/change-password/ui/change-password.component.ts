import { Component, inject } from '@angular/core';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { ChangePasswordModel } from '../models/change-password.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  backendService = inject(BackendService);
  isBussy = false;

  passwordModel: ChangePasswordModel = { currentPassword: '', newPassword: '' };
  confirmPassword = '';

  changePassword() {
    this.isBussy = true;
    let result = this.backendService.put<string, ChangePasswordModel>('api/v1/user/change-password', this.passwordModel);

    result.subscribe({
      next: res => this.isBussy = false,
      error: err => this.isBussy = false
    });
  }
}
