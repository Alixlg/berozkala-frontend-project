import { Injectable } from '@angular/core';
import { ProductPreview } from '../../products/ui/product-preview/models/productPreview.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: ProductPreview[] = [];
}
