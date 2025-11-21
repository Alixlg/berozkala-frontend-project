import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../../../../../+shared/services/backend.service';
import { ProductPreviewModel } from '../../../../products/ui/product-preview/models/productPreview.model';
import { ProductFilterModel } from '../../../../products/models/productFillter.model';

@Component({
  selector: 'app-products-banner',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './products-banner.component.html',
  styleUrl: './products-banner.component.css'
})
export class ProductsBannerComponent {
  backendService = inject(BackendService);

  products: ProductPreviewModel[] = [];
  productFillter: ProductFilterModel = { pageCount: 5, pageId: 1, fillter: 5 };
  discountPrice = 0;

  getProducts() {
    let result = this.backendService.post<ProductPreviewModel[], ProductFilterModel>('api/v1/productsprevirw/list', this.productFillter);

    result
      .subscribe({
        next: (res) => {
          if (res.isSuccess && res.body[0]) {
            this.products = res.body;
            this.discountPrice = Number(res.body[0].price) - (Number(res.body[0].price) * Number(res.body[0].discountPercent) / 100);
          }
        },
        error: err => {
          this.products = [];
        }
      });
  }

  ngOnInit() {
    this.getProducts();
  }
}
