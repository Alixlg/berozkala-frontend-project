import { AccountGender } from "../../../../../+shared/models/account.model";

export interface ProfileEditModel {
  phoneNumber: string;
  fullName?: string;
  userName: string;
  email?: string;
  gender: AccountGender;
  nationalCode?: string;
  dateOfBirth?: Date;
}
