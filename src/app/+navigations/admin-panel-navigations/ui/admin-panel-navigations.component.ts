import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../../../+shared/services/time.service';
import { AccountRole } from '../../../+shared/enums/account-role';
import { AuthCheckModel } from '../../public-navigations/models/auth-check.model';

@Component({
  selector: 'app-admin-component',
  imports: [RouterOutlet, RouterLink, FooterComponent, FormsModule],
  templateUrl: './admin-panel-navigations.component.html',
  styleUrl: './admin-panel-navigations.component.css'
})
export class AdminPanelNavigationsComponent {
  router = inject(Router);
  timeService = inject(TimeService);
  singOutModal = false;

  accountRole = AccountRole;

  authCheck: AuthCheckModel = {
    accountRole: AccountRole.none,
    isSingIn: false
  };
  
  singOut() {
    this.singOutModal = false;

    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    this.authCheck.accountRole = AccountRole.none
    this.authCheck.isSingIn = false

    this.router.navigateByUrl('/');
  }
}
