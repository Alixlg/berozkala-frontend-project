import { Component, inject, OnInit } from '@angular/core';
import { BasketService } from '../../../../../+services/basket.service';
import { AlertService } from '../../../../../+services/alert.service';
import { ProductBody } from '../../../../../+models/product';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-basket',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './manage-basket.component.html',
  styleUrl: './manage-basket.component.css'
})
export class ManageBasketComponent implements OnInit {
  basketProductsObj = inject(BasketService);
  alertSystemObj = inject(AlertService);

  remove($event: ProductBody) {
    if ($event.count == 1) {
      this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p.id != $event.id);

      this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت از سبد حذف شد`, 2000);

      $event.isRemoveDisable = true;
      setTimeout(() => {
        $event.isRemoveDisable = false;
      }, 2000);
    }
    else {
      let product = this.basketProductsObj.basket.find(p => p.id == $event.id);
      this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p.id != $event.id);
      if (product) {
        product.count -= 1;
        this.basketProductsObj.basket.push(product);
        this.basketProductsObj.basket.sort((a, b) => b.id - a.id);

        this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت از سبد حذف شد`, 2000);

        $event.isRemoveDisable = true;
        setTimeout(() => {
          $event.isRemoveDisable = false;
        }, 2000);
      }
    }
  }

  upCount(product: ProductBody) {
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت به سبد اضافه شد`, 2000);

    product.count++;
    product.isAddDisable = true;
    setTimeout(() => {
      product.isAddDisable = false;
    }, 2000);
  }

  downCount(product: ProductBody) {
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت از سبد کم شد`, 2000);

    product.count--;
    product.isRemoveDisable = true;
    setTimeout(() => {
      product.isRemoveDisable = false;
    }, 2000);
  }

  removeProduct(product: ProductBody) {
    product.count = 1;
    this.basketProductsObj.basket = this.basketProductsObj.basket.filter(p => p != product);
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت از سبد حذف شد`, 2000);
  }

  countPriceUpdater(price: string, count: number) {
    return Number(price) * count;
  }

  ngOnInit() {
    this.basketProductsObj.basket.sort((a, b) => b.id - a.id);
  }
}
