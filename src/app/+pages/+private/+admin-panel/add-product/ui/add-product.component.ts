import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../+public/products/service/product.service';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { AddProductModel } from '../models/addProduct.model';

@Component({
  selector: 'app-add-product',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  products = inject(ProductService);
  alertService = inject(AlertService);

  productModel: AddProductModel = {
    isAvailable: true,
    category: "",
    brand: "",
    title: "",
    price: 0,
    discountPercent: 0,
    previewImageUrl: "",
    imagesUrl: [],
    description: "",
    review: "",
    maxCount: 0,
    scoreRank: 5,
    garranty: [""],
    attributes: [
      {
        titleName: '',
        subset: [
          { subsetName: '', subsetValue: '' }
        ]
      }
    ]
  };

  isSuccessModal: boolean = false;
  isLoadnig: boolean = true;

  addAttributes() {
    this.productModel.attributes.push(
      {
        titleName: '',
        subset: [
          { subsetName: '', subsetValue: '' }
        ]
      }
    );
  }

  addSubset(subset: any[]) {
    subset.push({ subsetName: '', subsetValue: '' });
  }

  addProduct() {
    let result = this.products.addProduct(this.productModel);
    this.isSuccessModal = true;
    this.isLoadnig = true;
    this.alertService.newAlert("در حال اضافه کردن محصول", 2000, true);

    result.subscribe(r => {
      this.alertService.newAlert(`محصول ${this.productModel.title} ${this.productModel.brand} با موفقیت اضافه شد`, 2000);
      this.isLoadnig = false;
    });
  }
}
