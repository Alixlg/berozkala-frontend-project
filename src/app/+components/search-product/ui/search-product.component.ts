import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductPreview } from '../../../+pages/+public/products/ui/product-preview/models/productPreview.model';

@Component({
  selector: 'app-search-product',
  imports: [FormsModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {
  @Input() products: ProductPreview[] = [];
  @Output() onDone = new EventEmitter<ProductPreview[]>;
  @Output() onVisible = new EventEmitter<boolean>;

  searchValue = '';
  searchedProducts: ProductPreview[] = [];

  search() {
    if (this.searchValue != '') {
      this.searchedProducts = [];

      this.products.forEach(p => {
        if (!this.searchedProducts.includes(p)) { //agar az ghabl vojud nadasht
          if (p.title.includes(this.searchValue.toLocaleLowerCase()) || p.brand.includes(this.searchValue.toLocaleLowerCase())
            || `${p.title} ${p.brand}`.includes(this.searchValue.toLocaleLowerCase())) {

            this.searchedProducts.push(p);
          }
        }
      });

      this.onVisible.emit(false);
      this.onDone.emit(this.searchedProducts);
      return;
    }

    if (this.searchValue == '') {
      this.searchedProducts = [];

      this.onVisible.emit(true);
      this.onDone.emit(this.searchedProducts);
      return;
    }
  }
}
