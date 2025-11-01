import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { BasketService } from '../../../+pages/+public/basket/service/basket.service';
import { AuthCheckModel } from '../../models/auth-check.model';
import { AccountRole } from '../../../+shared/enums/account-role';
import { BackendService } from '../../../+shared/services/backend.service';
import { AccountService } from '../../../+shared/services/account.service';
import { NavigationProfileComponent } from "../../navigation-profile/ui/navigation-profile.component";

@Component({
  selector: 'app-public-navigations',
  imports: [RouterOutlet, RouterLink, FooterComponent, NavigationProfileComponent],
  templateUrl: './public-navigations.component.html',
  styleUrl: './public-navigations.component.css'
})
export class PublicNavigationsComponent implements OnInit {
  basketService = inject(BasketService);
  router = inject(Router);
  backendService = inject(BackendService);
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

  basketCount() {
    let count = 0;
    this.basketService.getBasketItems().forEach(x => {
      count += x.productCount;
    });

    return count;
  }

  ngOnInit() {
    var result = this.backendService.get<AuthCheckModel>('api/v1/auth/valid-token');
    result.subscribe({
      next: res => {
        if (res.isSuccess && (res.body != null || undefined)) {
          this.authCheck.accountRole = res.body.accountRole;
          this.authCheck.isSingIn = res.body.isSingIn
        }
      },
      error: err => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    });
  }
}
