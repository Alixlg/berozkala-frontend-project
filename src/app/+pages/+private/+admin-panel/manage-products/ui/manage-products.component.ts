import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketService } from '../../../../+public/basket/service/basket.service';
import { ProductService } from '../../../../+public/products/service/product.service';
import { DecimalPipe } from '@angular/common';
import { AlertService } from '../../../../../+services/alert.service';
import { ProductPreview } from '../../../../+public/products/product-preview/models/productPreview';

@Component({
  selector: 'app-manage-products',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  productsObj = inject(ProductService);
  basketObj = inject(BasketService);
  alertObj = inject(AlertService);

  addProductVisible: boolean = false;
  delProductVisible: boolean = false;
  searchProductVisible: boolean = false;
  editProductVisible: boolean = false;

  productBrand: string = '';
  productTitle: string = '';
  productPrice: string = '';
  productPic: string = '';

  searchedProduct?: ProductPreview;
  searchId: string = '';

  addProduct() {
    if (!this.productBrand || !this.productTitle || !this.productPrice || !this.productPic) {
      this.alertObj.newAlert('لطفاً تمام فیلدها را پر کنید', 2200, true);

      return;
    }
    if (isNaN(Number(this.productPrice))) {
      this.productPrice = '';
      this.alertObj.newAlert('لطفاً برای قیمت عدد وارد کنید', 2200, true);

      return;
    }

    this.productsObj.productsPreview.push(
      // new ProductPreview(this.productBrand, this.productTitle, this.productPrice, this.productPic, 5)
    );
    this.addProductVisible = !this.addProductVisible;

    this.productBrand = '';
    this.productTitle = '';
    this.productPrice = '';
    this.productPic = '';

    this.alertObj.newAlert('محصول شما با موفقیت ثبت شد', 2200);
  }

  delProduct(product: ProductPreview) {
    this.productsObj.productsPreview = this.productsObj.productsPreview.filter(p => p.id != product.id);
    this.basketObj.basket = this.basketObj.basket.filter(p => p.id != product.id);
    this.alertObj.newAlert('محصول شما با موفقیت حذف شد', 2200);
  }

  searchProduct() {
    if (this.searchId == '') {
      this.alertObj.newAlert('لطفا شناسه را وارد کنید', 2200, true);

      return;
    }
    if (isNaN(Number(this.searchId))) {
      this.alertObj.newAlert('شناسه نامعتبر میباشد', 2200, false, true);
      this.searchId = '';

      return;
    }

    let product = this.productsObj.productsPreview.find(x => x.id == Number(this.searchId));

    if (product) {
      this.searchedProduct = product;
      this.searchProductVisible = false;
      this.editProductVisible = true;

      this.alertObj.newAlert('محصول شما با موفقیت یافت شد', 2200);
      this.searchId = '';
    }
    else {
      this.alertObj.newAlert('محصول مورد نظر یافت نشد لطفا شناسه صحیح وارد کنید', 2200, false, true);
      this.searchId = '';

      return;
    }
  }

  editProduct() {
    if (this.searchedProduct) {
      if (!this.productBrand || !this.productTitle || !this.productPrice || !this.productPic) {
        this.alertObj.newAlert('لطفاً تمام فیلدها را پر کنید', 2200, false, true);

        return;
      }
      if (isNaN(Number(this.productPrice))) {
        this.productPrice = '';
        this.alertObj.newAlert('لطفاً برای قیمت عدد وارد کنید', 2200, true);

        return;
      }

      this.searchedProduct.brand = this.productBrand;
      this.searchedProduct.price = this.productPrice;
      this.searchedProduct.title = this.productTitle;
      this.searchedProduct.pic = this.productPic;

      this.productsObj.productsPreview = this.productsObj.productsPreview.filter(x => x.id != this.searchedProduct?.id);
      this.basketObj.basket = this.basketObj.basket.filter(x => x.id != this.searchedProduct?.id);
      this.productsObj.productsPreview.push(this.searchedProduct);

      this.productBrand = '';
      this.productTitle = '';
      this.productPrice = '';
      this.productPic = '';

      this.alertObj.newAlert('محصول شما با موفقیت ویرایش شد', 2200);
    }
    else {
      this.alertObj.newAlert('محصول مورد نظر یافت نشد لطفا شناسه را وارد کنید', 2200, false, true);
    }

    this.editProductVisible = false;
  }
}

