import { AccountRole } from "../enums/account-role";

export interface AccountModel {
  dateOfSingup: Date;
  accountRole: AccountRole;
  phoneNumber: string;
  fullName?: string;
  userName: string;
  addresses?: AddressModel[];
  email?: string;
  status: AccountStatus;
  gender: AccountGender;
  nationalCode?: string;
  dateOfBirth?: Date;
}

export interface AddressModel {
  addressBody: string;
  postalCode: string;
  phoneNumber?: string;
}

export enum AccountStatus {
  Active,
  InActive,
  Suspension
}

export enum AccountGender {
  Unknown,
  Male,
  FeMale
}
