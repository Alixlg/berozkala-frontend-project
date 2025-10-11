import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isShowLoading = false;

  show() {
    this.isShowLoading = true;
  }

  hide() {
    this.isShowLoading = false;
  }

  getStatus() {
    return this.isShowLoading;
  }
}
