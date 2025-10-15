import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AccountService } from '../../../+shared/services/account.service';
import { Router, RouterLink } from '@angular/router';
import { AccountRole } from '../../../+shared/enums/account-role';

@Component({
  selector: 'app-navigation-profile',
  imports: [RouterLink],
  templateUrl: './navigation-profile.component.html',
  styleUrl: './navigation-profile.component.css'
})
export class NavigationProfileComponent {
  accountService = inject(AccountService);
  router = inject(Router);

  accountRole = AccountRole;
  @Output() onSingOut = new EventEmitter<any>;

  singOutModal = false;
  isDropDown = false;

  singOut() {
    this.singOutModal = false;
    this.isDropDown = false;
    this.onSingOut.emit();
  }
}
