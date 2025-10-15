import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../../../+shared/services/time.service';
import { AccountRole } from '../../../+shared/enums/account-role';
import { AuthCheckModel } from '../../models/auth-check.model';
import { AccountService } from '../../../+shared/services/account.service';
import { NavigationProfileComponent } from "../../navigation-profile/ui/navigation-profile.component";

@Component({
  selector: 'app-admin-component',
  imports: [RouterOutlet, RouterLink, FooterComponent, FormsModule, NavigationProfileComponent],
  templateUrl: './admin-panel-navigations.component.html',
  styleUrl: './admin-panel-navigations.component.css'
})
export class AdminPanelNavigationsComponent {
  router = inject(Router);
  timeService = inject(TimeService);
  accountService = inject(AccountService);

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
