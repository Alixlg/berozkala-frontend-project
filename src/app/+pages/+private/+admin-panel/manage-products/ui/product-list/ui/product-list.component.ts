import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../+public/products/service/product.service';
import { Product } from '../../../../../../+public/products/ui/product/models/product.model';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];
  productToActions!: Product;
  isLoading: boolean = true;
  isDeleteModal: boolean = false;
  isDeleteModalLoading: boolean = false;
  isEditModal: boolean = false;

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

  productDeleteSubmited() {
    let result = this.productService.deleteProduct(this.productToActions);
    this.isDeleteModalLoading = true;
    result.subscribe(r => {
      this.isDeleteModalLoading = false;
      this.isDeleteModal = false;
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
