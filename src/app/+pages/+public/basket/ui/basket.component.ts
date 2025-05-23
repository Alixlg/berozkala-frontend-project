import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-basket',
  imports: [RouterOutlet],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {

  route = inject(Router);
  basketItems = inject(BasketService);
  index = 1;

  navigate() {
    if (this.index == 1) {
      this.route.navigateByUrl('/pb/basket/manage-basket');
    } else if (this.index == 2) {
      this.route.navigateByUrl('/pb/basket/checkout');
    } else if (this.index == 3) {
      this.route.navigateByUrl('/pb/basket/payment');
    }
  }

  ngOnInit() {
    if (this.route.isActive('/pb/basket/manage-basket', true)) {
      this.index = 1;
    } else if (this.route.isActive('/pb/basket/checkout', true)) {
      this.index = 2;
    } else if (this.route.isActive('/pb/basket/payment', true)) {
      this.index = 3;
    }
  }
}
