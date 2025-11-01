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

  buy(productId: string) {
    this.basketService.addItem(productId);
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
