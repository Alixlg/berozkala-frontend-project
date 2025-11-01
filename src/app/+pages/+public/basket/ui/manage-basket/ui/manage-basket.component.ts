import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscountCode } from '../models/manageBasket.model';
import { BasketService } from '../../../service/basket.service';
import { AlertService } from '../../../../../../+components/alert-system/service/alert.service';

@Component({
  selector: 'app-manage-basket',
  imports: [DecimalPipe, RouterLink, FormsModule],
  templateUrl: './manage-basket.component.html',
  styleUrl: './manage-basket.component.css'
})
export class ManageBasketComponent {
  basketService = inject(BasketService);
  alertSystemObj = inject(AlertService);
  discountCode: DiscountCode = { code: '' };

  upCount(productId: string, garrantyId?: string) {
    this.basketService.addItem(productId, garrantyId);
  }

  downCount(basketProductId: string) {
    this.basketService.removeItem(basketProductId);
  }

  removeProduct(basketProductId: string) {
    this.basketService.clearItem(basketProductId);
  }

  countPriceUpdater(price: number, count: number) {
    return price * count;
  }

  checkDiscountCode() {
    throw new Error('Method not implemented.');
  }

  basketPrice() {
    let price = 0;

    this.basketService.getBasketItems().forEach(x => {
      price += Number(x.product.price) * x.productCount;
    });

    return price;
  }

  ngOnInit() {
    this.basketService.updateBasketItems();
  }
}
