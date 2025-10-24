import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { ProductModel } from '../../../../+public/products/ui/product/models/product.model';
import { HttpParams } from '@angular/common/http';
import { ProductPreviewModel } from '../../../../+public/products/ui/product-preview/models/productPreview.model';
import { ProductFilterModel } from '../../../../+public/products/models/productFillter.model';
import { FaDatePipe } from '../../../../../+pipes/fa-date.pipe';

@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, FaDatePipe, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  alertService = inject(AlertService);
  backendService = inject(BackendService);

  products!: ProductModel[];
  productToActions!: ProductModel;
  isLoading: boolean = false;

  productFillter: ProductFilterModel = { pageId: 1, pageCount: 10 };

  isDeleteModal: boolean = false;
  isDeleteModalLoading: boolean = false;

  isEditModal: boolean = false;
  isEditModalLoading: boolean = false;

  searchQuery = '';

  addAttributes() {
    // this.productToActions.attributes.push(
    //   {
    //     titleName: '',
    //     subset: [
    //       { subsetName: '', subsetValue: '' }
    //     ]
    //   }
    // );
  }

  removeAttribute(id: string | undefined) {
    // this.productToActions.attributes = this.productToActions.attributes.filter(x => x != a);
  }

  addSubset(subsets: any[]) {
    subsets.push({ subsetName: '', subsetValue: '' });
  }

  removeSubset(id: string | undefined) {

  }

  removeGarranty(g: string | undefined) {
    // this.productToActions.garranty = this.productToActions.garranty.filter(x => x != g);
  }

  showScores(n: number) {
    let scores = [];
    for (let index = 0; index < n; index++) {
      scores.push(index);
    }
    return scores;
  }

  productDelete(id: string) {
    this.productToActions = this.products.find(p => p.id == id)!;
    this.isDeleteModal = true;
  }

  productEdit(id: string) {
    this.productToActions = this.products.find(p => p.id == id)!;
    this.isEditModal = true;
  }

  productDeleteSubmited() {
    this.isDeleteModalLoading = true;

    let result = this.backendService.del<string, string[]>('api/v1/products/delete', [this.productToActions.id]);

    result.subscribe({
      next: res => {
        this.getProducts();
        this.isDeleteModalLoading = false;
        this.isDeleteModal = false;
      },
      error: err => {
        this.isDeleteModalLoading = false;
      }
    });
  }

  productEditSubmited() {
    // let result = this.productService.editProduct(this.productToActions);
    // this.isEditModalLoading = true;
    // this.alertService.newAlert("در حال ویرایش محصول", 2000, true);

    // result.subscribe(res => {
    //   this.alertService.newAlert(`محصول ${this.productToActions.title} ${this.productToActions.brand} با موفقیت ویرایش شد`, 2000);
    //   this.isEditModalLoading = false;
    //   this.isEditModal = false;

    //   this.refresh()
    // });
  }

  getProducts() {
    this.isLoading = true;

    let result;

    if (this.searchQuery != '') {
      let param = new HttpParams()
        .set('searchQuery', this.searchQuery);

      result = this.backendService.post<ProductModel[], ProductFilterModel>('api/v1/products/list', this.productFillter, param);
    } else {
      result = this.backendService.post<ProductModel[], ProductFilterModel>('api/v1/products/list', this.productFillter);
    }

    result.subscribe({
      next: (res) => {
        if (res.isSuccess && res.body) {
          this.products = res.body;
          this.isLoading = false;
        } else {
          this.products = [];
          this.isLoading = false;
        }
      },
      error: err => {
        this.products = [];
        this.isLoading = false;
      }
    });
  }


  ngOnInit() {
    this.getProducts();
  }
}
