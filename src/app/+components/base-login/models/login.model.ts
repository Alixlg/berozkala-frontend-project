export interface LoginWithUsername {
  username: string;
  password: string;
  keepMe: boolean;
}

export interface LoginWithUsernameModel {
  userName: string;
  password: string;
}

export interface LoginWithCodeModel {
  phoneNumber: string;
}

export interface SubmitCodeModel {
  phoneNumber: string;
  optCode: number;
}
