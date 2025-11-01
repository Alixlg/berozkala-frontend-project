import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BackendService } from '../../../../../../+shared/services/backend.service';
import { ProductFilterModel } from '../../../models/productFillter.model';
import { ProductModel } from '../models/product.model';
import { HttpParams } from '@angular/common/http';
import { AlertService } from '../../../../../../+components/alert-system/service/alert.service';
import { BasketService } from '../../../../basket/service/basket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [RouterLink, DecimalPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  backendService = inject(BackendService);
  basketService = inject(BasketService);
  alertService = inject(AlertService);
  router = inject(Router);

  selectedGarranty: string | undefined;

  product!: ProductModel;
  productFillter: ProductFilterModel = { pageCount: 1, pageId: 1 };

  isLoading = false;

  showScores(n: number) {
    let scores = [];
    for (let index = 0; index < n; index++) {
      scores.push(index);
    }
    return scores;
  }

  submit() {
    this.selectedGarranty = this.selectedGarranty == "null" ? undefined : this.selectedGarranty;
    this.basketService.addItem(this.product.id, this.selectedGarranty);
  }

  ngOnInit() {
    this.isLoading = true;

    let id = '';
    this.activatedRoute.paramMap.subscribe(params => {
      id = params.get('id')!;
    });

    let param = new HttpParams()
      .set('searchQuery', id);

    let result = this.backendService.post<ProductModel[], ProductFilterModel>('api/v1/products/list', this.productFillter, param);

    result.subscribe({
      next: (res) => {
        if (res.isSuccess && res.body.length != 0) {
          this.product = res.body.find(x => x)!;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.alertService.newAlert('محصول مورد نظر یافت نشد', 3000, false, true);
          this.router.navigateByUrl('/pb/products');
        }
      },
      error: err => {
        this.isLoading = false;
        this.router.navigateByUrl('/pb/products');
      }
    });
  }
}
