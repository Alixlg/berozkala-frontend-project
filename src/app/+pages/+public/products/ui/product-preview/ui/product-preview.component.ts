import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductPreviewFrontendModel } from '../models/productPreview.model';
@Component({
  selector: 'app-product-preview',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: ProductPreviewFrontendModel;
  @Output() onBuy = new EventEmitter<ProductPreviewFrontendModel>;
  @Input() isAddDisable = false;

  scores: number[] = [];

  ngOnInit() {
    for (let index = 0; index < this.product.scoreRank; index++) {
      this.scores.push(index);
    }
  }
}
