import { Injectable } from '@angular/core';
import { ProductPreview } from '../+pages/+public/products/product-preview/models/productPreview';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: ProductPreview[] = [];
}
