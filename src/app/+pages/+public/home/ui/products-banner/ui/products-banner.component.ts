import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-banner',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './products-banner.component.html',
  styleUrl: './products-banner.component.css'
})
export class ProductsBannerComponent {

  discountProductPreview() {
    // let p = this.productBanners.getProductsPreview().find(x => x.discountPercent != 0);
    let p: any;
    return p;
  }

  discountPriceProduct() {
    // let p = this.productBanners.getProductsPreview().find(x => x.discountPercent != 0);
    // let discountPercent = Number(p?.price) - (Number(p?.price) * Number(p?.discountPercent) / 100);
    return 200;
  }

  getProductsPreview() {
    let p: any;
    return p;
  }
}
