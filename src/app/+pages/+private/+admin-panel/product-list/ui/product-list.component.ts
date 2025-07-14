import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../+public/products/service/product.service';
import { Product } from '../../../../+public/products/ui/product/models/product.model';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';

@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  alertService = inject(AlertService);
  products: Product[] = [];
  productToActions!: Product;
  isLoading: boolean = true;
  isDeleteModal: boolean = false;
  isDeleteModalLoading: boolean = false;
  isEditModal: boolean = false;
  isEditModalLoading: boolean = false;


  addAttributes() {
    this.productToActions.attributes.push(
      {
        titleName: '',
        subset: [
          { subsetName: '', subsetValue: '' }
        ]
      }
    );
  }

  removeAttribute(a: { titleName: string; subset: { subsetName: string; subsetValue: string; }[]; }) {
    this.productToActions.attributes = this.productToActions.attributes.filter(x => x != a);
  }

  addSubset(subsets: any[]) {
    subsets.push({ subsetName: '', subsetValue: '' });
  }

  removeSubset(
    subsets: {
      titleName: string;
      subset: { subsetName: string; subsetValue: string; }[];
    },
    subset: { subsetName: string, subsetValue: string }
  ) {
    subsets.subset = subsets.subset.filter(s =>
      s.subsetName !== subset.subsetName || s.subsetValue !== subset.subsetValue
    );
  }

  removeGarranty(g: string) {
    this.productToActions.garranty = this.productToActions.garranty.filter(x => x != g);
  }

  showScores(n: number) {
    let scores = [];
    for (let index = 0; index < n; index++) {
      scores.push(index);
    }
    return scores;
  }

  productDelete(p: Product) {
    this.productToActions = p;
    this.isDeleteModal = true;
  }

  productEdit(p: Product) {
    this.productToActions = p;
    this.isEditModal = true;
  }

  productDeleteSubmited() {
    let result = this.productService.deleteProduct(this.productToActions);
    this.isDeleteModalLoading = true;
    this.alertService.newAlert("در حال حذف محصول", 2000, true);

    result.subscribe(r => {
      this.alertService.newAlert(`محصول ${this.productToActions.title} ${this.productToActions.brand} با موفقیت حذف شد`, 2000);
      this.isDeleteModalLoading = false;
      this.isDeleteModal = false;
      this.refresh();
    });
  }

  productEditSubmited() {
    let result = this.productService.editProduct(this.productToActions);
    this.isEditModalLoading = true;
    this.alertService.newAlert("در حال ویرایش محصول", 2000, true);

    result.subscribe(r => {
      this.alertService.newAlert(`محصول ${this.productToActions.title} ${this.productToActions.brand} با موفقیت ویرایش شد`, 2000);
      this.isEditModalLoading = false;
      this.isEditModal = false;
      this.refresh();
    });
  }

  refresh() {
    let result = this.productService.getProducts();
    this.isLoading = true;

    result.subscribe(p => {
      this.products = p;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.refresh();
  }
}
