import { AccountRole } from "../../../+shared/enums/account-role";

export interface AuthCheckModel {
  accountRole: AccountRole,
  isSingIn: boolean,
}
