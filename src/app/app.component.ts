import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { AlertSystemComponent } from './+components/alert-system/ui/alert-system.component';
import { LoadingComponent } from "./+components/loading/ui/loading.component";
import { BackendService } from './+shared/services/backend.service';
import { AccountModel } from './+shared/models/account.model';
import { AccountService } from './+shared/services/account.service';
import { BasketService } from './+pages/+public/basket/service/basket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertSystemComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'berozkala-frontend';
  router = inject(Router);
  backendService = inject(BackendService);
  accountService = inject(AccountService);
  basketService = inject(BasketService);

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     setTimeout(() => window.HSStaticMethods.autoInit(), 1000);
    //   }
    // });

    this.basketService.updateBasketItems();

    this.accountService.setAccount().subscribe(res => {
      if (!res.isSuccess) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
      }
    });
  }

  ngAfterViewChecked() {
    window.HSStaticMethods.autoInit();
  }
}
