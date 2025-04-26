export interface Alert {
  alertContent: string;
  isVisible: boolean;
  isSuccess: boolean;
  isWarning: boolean;
  isError: boolean;
  isSpecial: boolean;
}

export class AlertBody implements Alert {
  alertContent = '';
  isVisible = true;
  isSuccess = true;
  isWarning = false;
  isError = false;
  isSpecial = false;

  constructor(alertContent: string, isWarning: boolean, isError: boolean, isSpecial: boolean) {
    this.alertContent = alertContent;

    if (isWarning == true || isSpecial == true || isError == true) {
      this.isSuccess = false;
    }

    this.isWarning = isWarning;
    this.isError = isError;
    this.isSpecial = isSpecial;
  }
}
