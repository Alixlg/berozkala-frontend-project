import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BasketService } from '../../basket/service/basket.service';
import { ProductService } from '../service/product.service';
import { FormsModule } from '@angular/forms';
import { SearchProductComponent } from '../../../../+components/search-product/ui/search-product.component';
import { ProductPreviewComponent } from './product-preview/ui/product-preview.component';
import { ProductPreviewFrontendModel } from './product-preview/models/productPreview.model';
import { AlertService } from '../../../../+components/alert-system/service/alert.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductPreviewComponent, RouterOutlet, FormsModule, SearchProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  alertSystemObj = inject(AlertService);
  productsObj = inject(ProductService);
  basketObj = inject(BasketService);
  router = inject(Router);

  searchedProducts: ProductPreviewFrontendModel[] = [];
  isSearchBoxEmpty = true;

  productsFiltered = '';

  buy($event: ProductPreviewFrontendModel) {
    let basket = this.basketObj.getBasketItems();

    if (basket.every(p => p.id != $event.id)) {
      this.basketObj.addItem($event);

      this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت به سبد اضافه شد`, 2000);

      $event.isAddDisable = true;
      setTimeout(() => {
        $event.isAddDisable = false;
      }, 2000);
    }
    else {
      let product = this.basketObj.getBasketItems().find(p => p.id == $event.id);
      this.basketObj.removeItem($event);

      if (product) { // agar undefine nabood
        product.count += 1;
        this.basketObj.addItem(product);

        this.alertSystemObj.newAlert(`محصول ${$event.title} ${$event.brand} با موفقیت به سبد اضافه شد`, 2000);

        $event.isAddDisable = true;
        setTimeout(() => {
          $event.isAddDisable = false;
        }, 2000);
      }
    }
  }

  search($event: ProductPreviewFrontendModel[]) {
    this.searchedProducts = $event;

    if (this.isSearchBoxEmpty) {
      this.productsFiltered = '';
    }
    else {
      this.productsFiltered = 'search';
    }
  }

  filterBy() {
    switch (this.productsFiltered) {
      case 'price-up':
        return this.productsObj.getProductsPreview().sort((a, b) => Number(b.price) - Number(a.price));

      case 'price-down':
        return this.productsObj.getProductsPreview().sort((a, b) => Number(a.price) - Number(b.price));

      case 'new-products':
        return this.productsObj.getProductsPreview().sort((a, b) => b.id - a.id);

      case 'old-products':
        return this.productsObj.getProductsPreview().sort((a, b) => a.id - b.id);

      case 'search':
        return this.searchedProducts;

      default: return this.productsObj.getProductsPreview();
    }
  }

  // ngOnInit() {
  //   for (let index = 0; index < 30; index++) {
  //     this.productsObj.products.push(new Product('test', 'test', '900000', 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/6e61b/MainAfter.avif'));
  //   }
  // }
}
