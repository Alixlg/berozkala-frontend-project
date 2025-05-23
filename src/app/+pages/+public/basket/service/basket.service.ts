import { Injectable } from '@angular/core';
import { ProductPreview } from '../../products/ui/product-preview/models/productPreview.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: ProductPreview[] = [];

  getBasketItems() {
    return this.basket;
  }

  addItem(product: ProductPreview) {
    let result = false;
    this.basket.push(product);
    result = true; //agar add movafaghiat amiz bud (mesal chon in javab az backend miad !)

    return of(result);
  }

  removeItem(product: ProductPreview) {
    let result = false;
    this.basket = this.basket.filter(x => x.id != product.id);
    result = true; //agar add movafaghiat amiz bud (mesal chon in javab az backend miad !)

    return of(result);
  }

  sortById() {
    return this.basket.sort((a, b) => b.id - a.id);
  }
}
