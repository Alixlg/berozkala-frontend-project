import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductBody } from '../../../../../../+models/product';
import { AlertService } from '../../../../../../+services/alert.service';

@Component({
  selector: 'app-product-preview',
  imports: [DecimalPipe],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent {
  @Input() product!: ProductBody;
  @Output() onBuy = new EventEmitter<ProductBody>;
  @Output() onRemove = new EventEmitter<ProductBody>;
  @Input() isBasket: boolean = false;
  @Input() isAddDisable = false;
  @Input() isRemoveDisable = false;

  productAlertObj = inject(AlertService);

  countPriceUpdater() {
    return this.isBasket ? Number(this.product.price) * this.product.count : this.product.price;
  }
}
