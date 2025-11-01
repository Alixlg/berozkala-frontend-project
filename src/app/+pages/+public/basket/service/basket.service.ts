import { inject, Injectable } from '@angular/core';
import { GetBasketProductModel, ProductToBasket } from '../models/basket.model';
import { BackendService } from '../../../../+shared/services/backend.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private backendService = inject(BackendService);
  private basket: GetBasketProductModel[] = [];

  getBasketItems() {
    return this.basket;
  }

  updateBasketItems() {
    let result = this.backendService.get<GetBasketProductModel[]>('api/v1/basket/get-products');
    result.subscribe({
      next: res => {
        if (res.isSuccess) {
          this.basket = res.body;
        } else {
          this.basket = [];
        }
      },
      error: err => {
        this.basket = [];
      }
    });
  }

  addItem(productId: string, garrantyId?: string) {
    let result = this.backendService.post<string, ProductToBasket>('api/v1/basket/add-product', { productId: productId, selectedGarranty: garrantyId });
    result.subscribe({
      complete: () => {
        this.updateBasketItems();
      }
    });
  }

  removeItem(productId: string) {
    let params = new HttpParams().set('basketProductId', productId);

    let result = this.backendService.del<string, undefined>('api/v1/basket/remove-product', undefined, params);
    result.subscribe({
      complete: () => {
        this.updateBasketItems();
      }
    });
  }

  clearItem(productId: string) {
    let params = new HttpParams().set('basketProductId', productId);

    let result = this.backendService.del<string, undefined>('api/v1/basket/clear-product', undefined, params);
    result.subscribe({
      complete: () => {
        this.updateBasketItems();
      }
    });
  }
}
