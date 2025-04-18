import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductBody } from '../../../../../../+models/product';
import { AlertService } from '../../../../../../+services/alert.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-preview',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: ProductBody;
  @Output() onBuy = new EventEmitter<ProductBody>;
  @Output() onRemove = new EventEmitter<ProductBody>;
  @Input() isBasket: boolean = false;
  @Input() isAddDisable = false;
  @Input() isRemoveDisable = false;

  productAlertObj = inject(AlertService);
  scores: number[] = [];

  countPriceUpdater() {
    return this.isBasket ? Number(this.product.price) * this.product.count : this.product.price;
  }

  ngOnInit() {
    for (let index = 0; index < this.product.scoreRank; index++) {
      this.scores.push(index);
    }
  }
}
