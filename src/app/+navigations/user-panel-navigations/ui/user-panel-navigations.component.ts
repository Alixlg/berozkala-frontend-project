import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TimeService } from '../../../+shared/services/time.service';
import { AccountService } from '../../../+shared/services/account.service';
import { AccountRole } from '../../../+shared/enums/account-role';
import { AuthCheckModel } from '../../models/auth-check.model';
import { NavigationProfileComponent } from "../../navigation-profile/ui/navigation-profile.component";
import { FooterComponent } from "../../../+components/footer/ui/footer.component";

@Component({
  selector: 'app-user-panel',
  imports: [NavigationProfileComponent, RouterLink, FooterComponent, RouterOutlet],
  templateUrl: './user-panel-navigations.component.html',
  styleUrl: './user-panel-navigations.component.css'
})
export class UserPanelNavigationsComponent {
  router = inject(Router);
  timeService = inject(TimeService);
  accountService = inject(AccountService);

  singOutModal = false;

  accountRole = AccountRole;
  authCheck: AuthCheckModel = {
    accountRole: AccountRole.none,
    isSingIn: false
  };

  singOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    this.authCheck.accountRole = AccountRole.none
    this.authCheck.isSingIn = false

    this.accountService.clear();
    this.router.navigateByUrl('/');
  }
}
