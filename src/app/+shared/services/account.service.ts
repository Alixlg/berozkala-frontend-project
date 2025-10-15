import { inject, Injectable } from '@angular/core';
import { AccountModel } from '../models/account.model';
import { BackendService } from './backend.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountModel?: AccountModel;
  backendService = inject(BackendService);

  setAccount() {
    return this.backendService.get<AccountModel>('api/v1/auth/member/get-info')
      .pipe(
        tap(res => {
          if (res.isSuccess && res.body != null) {
            this.accountModel = res.body;
          }
        })
      );
  }

  getAccount() {
    return this.accountModel;
  }

  clear() {
    this.accountModel = undefined;
  }
}
