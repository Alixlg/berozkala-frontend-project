import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../../../../+services/alert.service';
import { ProductBody } from '../../../../../+models/product';

@Component({
  selector: 'app-product-preview',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: ProductBody;
  @Output() onBuy = new EventEmitter<ProductBody>;
  @Input() isAddDisable = false;

  productAlertObj = inject(AlertService);
  scores: number[] = [];

  ngOnInit() {
    for (let index = 0; index < this.product.scoreRank; index++) {
      this.scores.push(index);
    }
  }
}
