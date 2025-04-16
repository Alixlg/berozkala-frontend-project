import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../../+services/product.service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-banner',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './products-banner.component.html',
  styleUrl: './products-banner.component.css'
})
export class ProductsBannerComponent {
  productBanners = inject(ProductService);

  discountProductPreview() {
    let p = this.productBanners.products.find(x => x.discountPercent != '0');
    return p;
  }

  discountPriceProduct() {
    let p = this.productBanners.products.find(x => x.discountPercent != '0');
    let discountPercent = Number(p?.price) - (Number(p?.price) * Number(p?.discountPercent) / 100);
    return discountPercent;
  }
}
