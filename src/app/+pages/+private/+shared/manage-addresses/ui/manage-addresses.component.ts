import { Component, inject } from '@angular/core';
import { AccountService } from '../../../../../+shared/services/account.service';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { AddressModel } from '../../../../../+shared/models/account.model';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-manage-addresses',
  imports: [FormsModule],
  templateUrl: './manage-addresses.component.html',
  styleUrl: './manage-addresses.component.css'
})
export class ManageAddressesComponent {
  accountService = inject(AccountService);
  backendService = inject(BackendService);
  alertService = inject(AlertService);

  addressesAddModel: AddressModel[] = [];
  addressesEditModel: AddressModel[];

  isBussy = false;

  addNewAddress() {
    this.addressesAddModel.push({ addressBody: '', postalCode: '', phoneNumber: '' });
  }

  removeAddress(obj: AddressModel) {
    if (obj.id) {
      let result = this.backendService.del<string, undefined>(`api/v1/address/delete/${obj.id}`);
      result.subscribe(res => {
        this.accountService.setAccount().subscribe({
          next: () => this.isBussy = false,
          error: () => this.isBussy = false
        });
      });
    } else {
      this.addressesAddModel = this.addressesAddModel.filter(x => x != obj);
    }
  }

  submitChanges() {
    let addResult = this.backendService.post<string, AddressModel[]>('api/v1/addresses/add', this.addressesAddModel);
    let editResult = this.backendService.put<string, AddressModel[]>('api/v1/addresses/edit', this.addressesEditModel);

    if (this.addressesAddModel.length != 0) {
      this.isBussy = true;
      addResult.subscribe({
        next: res => {
          this.addressesAddModel = [];
          this.accountService.setAccount().subscribe({
            next: () => this.isBussy = false,
            error: () => this.isBussy = false
          });
        },
        error: () => this.isBussy = false
      });
    }

    if (this.addressesEditModel.length != 0) { // ایراد دارد
      this.isBussy = true;
      editResult.subscribe({
        next: res => {
          this.addressesEditModel = [];
          this.accountService.setAccount().subscribe({
            next: () => this.isBussy = false,
            error: () => this.isBussy = false
          });
        },
        error: () => this.isBussy = false
      });
    }
  }

  get allAddresses() {
    return [
      ...(this.accountService.getAccount()?.addresses ?? []),
      ...(this.addressesAddModel ?? [])
    ];
  }

  constructor() {
    let accountInfo = this.accountService.getAccount();
    if (accountInfo) {
      this.addressesEditModel = accountInfo.addresses ?? [];
    } else {
      this.alertService.newAlert('اطلاعات فعلی شما یافت نشد لطفا صفحه را رفرش دهید', 3000, false, true);
      this.addressesEditModel = [];
    }
  }
}
