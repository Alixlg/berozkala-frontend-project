import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../../../../+shared/models/product.model';

@Component({
  selector: 'app-product',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  product!: any | Product;
  isLoading = false;

  showScores(n: number) {
    let scores = [];
    for (let index = 0; index < n; index++) {
      scores.push(index);
    }
    return scores;
  }

  async ngOnInit() {
    let id = '';
    // let category = '';
    this.activatedRoute.paramMap.subscribe(params => {
      id = params.get('id')!;
      // category = params.get('category')!;
    });

    this.product = await this.productService.getProduct(id);
    // let result = this.products.getProduct(id);

    // result.subscribe(r => {
    //   if (r) {
    //     this.product = r;
    //     this.isLoading = false;
    //   }
    //   else {
    //     this.router.navigateByUrl('/pb/products/404');
    //   }
    // });
  }
}
