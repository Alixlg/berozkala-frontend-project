import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  products = inject(ProductService);
  product!: Product;
  isLoading = true;

  ngOnInit() {
    let id = '';
    this.activatedRoute.paramMap.subscribe(params => {
      id = params.get('id')!;
    });
    let result = this.products.getProduct(id);

    result.subscribe(r => {
      if (r) {
        this.product = r;
        this.isLoading = false;
      }
      else {
        this.router.navigateByUrl('/pb/products/404');
      }
    });
  }
}
