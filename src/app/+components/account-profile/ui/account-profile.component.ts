import { Component, inject } from '@angular/core';
import { AccountService } from '../../../+shared/services/account.service';
import { AccountRolePipe, AccountGenderPipe, AccountStatusPipe } from '../../../+pipes/account.pipe';
import { FaDatePipe } from '../../../+pipes/fa-date.pipe';

@Component({
  selector: 'app-account-profile',
  imports: [AccountRolePipe, AccountGenderPipe, AccountStatusPipe, FaDatePipe],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {
  accountService = inject(AccountService);
}
