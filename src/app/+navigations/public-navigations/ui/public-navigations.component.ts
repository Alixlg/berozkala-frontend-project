import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { BasketService } from '../../../+pages/+public/basket/service/basket.service';
import { AuthCheckModel } from '../models/auth-check.model';
import { AccountRole } from '../../../+shared/enums/account-role';
import { BackendService } from '../../../+shared/services/backend.service';
import { LoadingService } from '../../../+components/loading/service/loading.service';

@Component({
  selector: 'app-public-navigations',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './public-navigations.component.html',
  styleUrl: './public-navigations.component.css'
})
export class PublicNavigationsComponent implements OnInit {
  basketService = inject(BasketService);
  router = inject(Router);
  backendService = inject(BackendService);
  loadingService = inject(LoadingService);

  singOutModal = false;
  isDropDown = false;
  accountRole = AccountRole;

  authCheck: AuthCheckModel = {
    accountRole: AccountRole.none,
    isSingIn: false
  };

  singOut() {
    this.singOutModal = false;
    this.isDropDown = false;

    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    this.authCheck.accountRole = AccountRole.none
    this.authCheck.isSingIn = false

    this.router.navigateByUrl('/');
  }

  basketCount() {
    let count = 0;
    this.basketService.getBasketItems().forEach(x => {
      count += x.count;
    });

    return count;
  }

  ngOnInit() {
    this.loadingService.show();
    var result = this.backendService.get<AuthCheckModel>('api/v1/auth/valid-token');
    result.subscribe({
      next: res => {
        if (res.isSuccess && (res.body != null || undefined)) {
          this.authCheck.accountRole = res.body.accountRole;
          this.authCheck.isSingIn = res.body.isSingIn
        }
        this.loadingService.hide();
      },
      error: err => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.loadingService.hide();
      }
    });
  }
}
