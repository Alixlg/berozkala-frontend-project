import { Pipe, PipeTransform } from '@angular/core';
import { AccountRole } from '../+shared/enums/account-role';
import { AccountGender, AccountStatus } from '../+shared/models/account.model';

@Pipe({
  name: 'accountRole'
})
export class AccountRolePipe implements PipeTransform {

  transform(value: AccountRole | undefined): string {
    if (value == undefined) {
      return 'نامشخص';
    }

    switch (value) {
      case AccountRole.user: return 'کاربر';
      case AccountRole.admin: return 'مدیر';
      default: return 'نامشخص';
    }
  }

}

@Pipe({
  name: 'accountGender'
})
export class AccountGenderPipe implements PipeTransform {

  transform(value: AccountGender | undefined): string {
    if (value == undefined) {
      return 'نامشخص';
    }

    switch (value) {
      case AccountGender.Male: return 'آقا';
      case AccountGender.FeMale: return 'خانم';
      default: return 'نامشخص';
    }
  }

}

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value: AccountStatus | undefined): string {
    if (value == undefined) {
      return 'نامشخص';
    }

    switch (value) {
      case AccountStatus.Active: return 'فعال';
      case AccountStatus.InActive: return 'غیر فعال';
      case AccountStatus.Suspension: return 'در حالت تعلیق';
      default: return 'نامشخص';
    }
  }

}
