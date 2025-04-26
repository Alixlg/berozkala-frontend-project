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
  productModel: Product = new Product(true, '', '', '', '', '', [], [], 0, [], 1, '');
  products = inject(ProductService);

  setNumber(maxNum: number, minNum: number, num: number) {
    if (num <= maxNum && num >= minNum) {
      return num;
    }
    else if (num > maxNum) {
      return maxNum;
    }
    else {
      return minNum;
    }
  }
}
