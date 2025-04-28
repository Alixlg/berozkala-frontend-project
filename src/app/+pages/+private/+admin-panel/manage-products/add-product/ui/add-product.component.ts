import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../../../+services/product.service';
import { Product } from '../../../../../+public/products/product/models/product';
import { FormsModule } from '@angular/forms';

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
  ], 1, '');

  addSpecifications() {
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
    console.log(this.productModel);
  }
}
