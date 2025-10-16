import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { ManageBasketComponent } from "./manage-basket/ui/manage-basket.component";
import { CheckoutComponent } from "./checkout/ui/checkout.component";
import { PaymentsComponent } from "./payment/ui/payments.component";

@Component({
  selector: 'app-basket',
  imports: [ManageBasketComponent, CheckoutComponent, PaymentsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  basketService = inject(BasketService);
  index = 1;
}
