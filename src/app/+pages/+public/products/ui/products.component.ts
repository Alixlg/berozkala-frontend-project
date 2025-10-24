import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BasketService } from '../../basket/service/basket.service';
import { FormsModule } from '@angular/forms';
import { ProductPreviewComponent } from './product-preview/ui/product-preview.component';
import { ProductPreviewFrontendModel, ProductPreviewModel } from './product-preview/models/productPreview.model';
import { AlertService } from '../../../../+components/alert-system/service/alert.service';
import { Router } from '@angular/router';
import { BackendService } from '../../../../+shared/services/backend.service';
import { ProductFilterModel } from '../models/productFillter.model';
import { map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [ProductPreviewComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  alertService = inject(AlertService);
  basketService = inject(BasketService);
  backendService = inject(BackendService);
  router = inject(Router);

  searchedProducts: ProductPreviewFrontendModel[] = [];
  productFillter: ProductFilterModel = { pageCount: 20, pageId: 1, fillter: 0 };

  isBusy = false;
  searchQuery = '';

  buy($event: ProductPreviewFrontendModel) {
    let basket = this.basketService.getBasketItems();

    if (basket.every(p => p.id != $event.id)) {
      this.basketService.addItem($event);

      this.alertService.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت به سبد اضافه شد`, 2000);

      $event.isAddDisable = true;
      setTimeout(() => {
        $event.isAddDisable = false;
      }, 2000);
    }
    else {
      let product = this.basketService.getBasketItems().find(p => p.id == $event.id);
      this.basketService.removeItem($event);

      if (product) { // agar undefine nabood
        product.count += 1;
        this.basketService.addItem(product);

        this.alertService.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت به سبد اضافه شد`, 2000);

        $event.isAddDisable = true;
        setTimeout(() => {
          $event.isAddDisable = false;
        }, 2000);
      }
    }
  }

  search() {
    this.getProducts();
  }

  getProducts() {
    this.isBusy = true;

    let result;

    if (this.searchQuery != '') {
      let param = new HttpParams()
        .set('searchQuery', this.searchQuery);

      result = this.backendService.post<ProductPreviewModel[], ProductFilterModel>('api/v1/productsprevirw/list', this.productFillter, param);
    } else {
      result = this.backendService.post<ProductPreviewModel[], ProductFilterModel>('api/v1/productsprevirw/list', this.productFillter);
    }

    result
      .pipe(
        map((obj: { body: ProductPreviewModel[] }) => {
          return obj.body.map(product => ({
            ...product,
            count: 1,
            isAddDisable: false,
            isRemoveDisable: true
          } as ProductPreviewFrontendModel));
        })
      )
      .subscribe({
        next: (res) => {
          this.searchedProducts = res;
          this.isBusy = false;
        },
        error: err => {
          this.searchedProducts = [];
          this.isBusy = false;
        }
      });
  }

  ngOnInit() {
    this.getProducts();
  }
}
