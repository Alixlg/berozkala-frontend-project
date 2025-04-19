import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [RouterOutlet],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent{

  route = inject(Router);
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
}
