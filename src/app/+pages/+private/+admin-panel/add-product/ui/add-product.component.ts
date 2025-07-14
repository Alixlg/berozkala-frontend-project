import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../+public/products/service/product.service';
import { Product } from '../../../../+public/products/ui/product/models/product.model';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';

@Component({
  selector: 'app-add-product',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  products = inject(ProductService);
  alertService = inject(AlertService);

  productModel: Product = new Product(true, '', '', '', '', '', [''], [''], 5, [
    {
      titleName: '',
      subset: [
        { subsetName: '', subsetValue: '' }
      ]
    }
  ], 1, '', '', '');
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
