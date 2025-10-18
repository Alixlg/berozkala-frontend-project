import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../../../+shared/services/account.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { ProfileEditModel } from '../models/profile-edit.model';
import { BackendService } from '../../../../../+shared/services/backend.service';

@Component({
  selector: 'app-profile-edit',
  imports: [FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  accountService = inject(AccountService);
  alertService = inject(AlertService);
  backendService = inject(BackendService);

  editModel: ProfileEditModel;
  isBussy = false;

  submitEdit() {
    this.isBussy = true;
    this.editModel.gender = Number(this.editModel.gender);

    let result = this.backendService.put<string, ProfileEditModel>('api/v1/user/edit-profile', this.editModel);
    result.subscribe({
      next: res => {
        this.accountService.setAccount().subscribe();
        this.isBussy = false;
      },
      error: () => this.isBussy = false
    });
  }

  constructor() {
    let accountInfo = this.accountService.getAccount();
    if (accountInfo) {
      this.editModel = {
        userName: accountInfo.userName,
        gender: accountInfo.gender,
        phoneNumber: accountInfo.phoneNumber,
        fullName: accountInfo.fullName,
        dateOfBirth: accountInfo.dateOfBirth,
        email: accountInfo.email,
        nationalCode: accountInfo.nationalCode
      };
    } else {
      this.alertService.newAlert('اطلاعات فعلی شما یافت نشد لطفا صفحه را رفرش دهید', 3000, false, true);
      this.editModel = {
        userName: '',
        gender: 0,
        phoneNumber: '',
        fullName: '',
        dateOfBirth: new Date(),
        email: '',
        nationalCode: ''
      };
    }
  }
}
