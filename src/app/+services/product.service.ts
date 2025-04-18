import { Injectable } from '@angular/core';
import { ProductBody } from '../+models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: ProductBody[] = [
    new ProductBody('ریزر', 'کیبورد گیمینگ', '9800000', '/images/Razer.png', 2),
    new ProductBody('ریزر', 'موس گیمینگ', '7700000', '/images/Lajitec.png', 5),
    new ProductBody('لاجیتک', 'کیبورد گیمینگ', '7200000', 'https://wolflandshop.com/wp-content/uploads/2023/03/68-11.jpg', 3, '25'),
    new ProductBody('تسکو', 'کیبورد گیمینگ', '4600000', 'https://tsco.ir/wp-content/uploads/2022/08/1080-2.jpg', 4),
    new ProductBody('لاجیتک', 'موس گیمینگ', '5300000', 'https://toosarax.com/wp-content/uploads/2023/08/001-9.jpg', 1, '15'),
    new ProductBody('ریزر', 'هدفن گیمینگ', '6520400', 'https://ayandehit.com/media_root/images/products/Razer-Kraken-X-Lite.jpg', 5),
    new ProductBody('تسکو', 'هدفن گیمینگ', '3200000', 'https://www.tsco.shop/wp-content/uploads/2022/11/TSCO-TH5151-Gaming-Headset-tsco.shop-4.jpg', 4),
    new ProductBody('لاجیتک', 'هدفن گیمینگ', '4600000', 'https://espeero.com/wp-content/uploads/2019/05/IMG_0556.png', 3)
  ]
}
