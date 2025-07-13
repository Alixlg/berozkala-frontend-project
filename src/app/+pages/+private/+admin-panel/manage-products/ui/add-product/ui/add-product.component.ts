import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../../../+public/products/ui/product/models/product.model';
import { ProductService } from '../../../../../../+public/products/service/product.service';

@Component({
  selector: 'app-add-product',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  products = inject(ProductService);
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

    result.subscribe(r => {
      this.isLoadnig = false;
    });
  }
}
