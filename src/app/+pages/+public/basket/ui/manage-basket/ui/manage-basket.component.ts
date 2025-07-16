import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiscountCode } from '../models/manageBasket.model';
import { BasketService } from '../../../service/basket.service';
import { AlertService } from '../../../../../../+components/alert-system/service/alert.service';
import { ProductPreviewFrontendModel } from '../../../../products/ui/product-preview/models/productPreview.model';

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

  remove($event: ProductPreviewFrontendModel) {
    if ($event.count == 1) {
      this.basketService.removeItem($event);

      this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت از سبد حذف شد`, 2000);

      $event.isRemoveDisable = true;
      setTimeout(() => {
        $event.isRemoveDisable = false;
      }, 2000);
    }
    else {
      let product = this.basketService.getBasketItems().find(p => p.id == $event.id);
      this.basketService.removeItem($event);

      if (product) {
        product.count -= 1;
        this.basketService.addItem(product);

        this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت از سبد حذف شد`, 2000);

        $event.isRemoveDisable = true;
        setTimeout(() => {
          $event.isRemoveDisable = false;
        }, 2000);
      }
    }
  }

  upCount(product: ProductPreviewFrontendModel) {
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت به سبد اضافه شد`, 2000);

    product.count++;
    product.isAddDisable = true;
    setTimeout(() => {
      product.isAddDisable = false;
    }, 2000);
  }

  downCount(product: ProductPreviewFrontendModel) {
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت از سبد کم شد`, 2000);

    product.count--;
    product.isRemoveDisable = true;
    setTimeout(() => {
      product.isRemoveDisable = false;
    }, 2000);
  }

  removeProduct(product: ProductPreviewFrontendModel) {
    product.count = 1;
    this.basketService.removeItem(product);
    this.alertSystemObj.newAlert(`محصول ${product.title} ${product.brand} با موفقیت از سبد حذف شد`, 2000);
  }

  countPriceUpdater(price: string, count: number) {
    return Number(price) * count;
  }

  checkDiscountCode() {
    throw new Error('Method not implemented.');
  }

  basketPrice() {
    let price = 0;

    this.basketService.getBasketItems().forEach(x => {
      price += Number(x.price) * x.count;
    });

    return price;
  }
}
