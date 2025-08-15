import { inject, Injectable } from '@angular/core';
import { ProductPreviewFrontendModel } from '../ui/product-preview/models/productPreview.model';
import { delay, of } from 'rxjs';
import { Product } from '../../../../+shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { AddProductModel } from '../../../+private/+admin-panel/add-product/models/addProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpService = inject(HttpClient);
  //   new ProductClass(
  //     false,
  //     'computer',
  //     'ریزر',
  //     'کیبورد گیمینگ',
  //     '9800000',
  //     '/images/Razer.png',
  //     [
  //       'https://assets2.razerzone.com/images/pnx.assets/5330432bc718cd8deb4f652df8f2fbd3/razer-huntsman-v3-pro-tkl-500x500.webp',
  //       'https://assets2.razerzone.com/images/pnx.assets/930d8250b82be9d438c6a1de524b5b5d/quick-actuation-adjustment-mode.webp',
  //       'https://assets2.razerzone.com/images/pnx.assets/930d8250b82be9d438c6a1de524b5b5d/quick-rapid-trigger-adjustment-mode.webp',
  //       'https://assets2.razerzone.com/images/pnx.assets/930d8250b82be9d438c6a1de524b5b5d/quick-side-snap-asdjustment-mode.webp'
  //     ],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     2,
  //     [
  //       {
  //         titleName: 'مشخصات فیزیکی',
  //         subset: [
  //           { subsetName: 'ابعاد', subsetValue: 'طول: 43.50 سانتیمتر، عرض: 12.50 سانتیمتر، ضخامت: 3.40 سانتیمتر' },
  //           { subsetName: 'وزن', subsetValue: '650 گرم' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات کیبورد',
  //         subset: [
  //           { subsetName: 'نوع رابط', subsetValue: 'پورت USB' },
  //           { subsetName: 'ورودی USB', subsetValue: '✅' },
  //           { subsetName: 'ورودی میکروفن و هدفون', subsetValue: 'نامشخص' },
  //           { subsetName: 'تاچ پد', subsetValue: '❌' },
  //           { subsetName: 'چراغ‌ پس زمینه صفحه کلید', subsetValue: '✅' },
  //           { subsetName: 'سازگار با سیستم عامل‌ها', subsetValue: 'Vista، XP، Windows 7، Windows 8، Windows 10، Windows 11' },
  //           { subsetName: 'نوع اتصال', subsetValue: 'سیمی' },
  //           { subsetName: 'تعداد کلیدها', subsetValue: '104 عدد' },
  //           { subsetName: 'تعداد کلیدهای میانبر', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در مقابل نفوذ مایعات', subsetValue: 'نامشخص' },
  //           { subsetName: 'طول کابل', subsetValue: '1.80 متر' },
  //           { subsetName: 'منبع تغذیه', subsetValue: '(USB Bus (+5V' },
  //           { subsetName: 'مقاوم در برابر رطوبت', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در برابر گرد و غبار', subsetValue: 'نامشخص' },
  //           { subsetName: 'نمایشگر میزان باتری صفحه کلید', subsetValue: '❌' },
  //           { subsetName: 'حروف حک شده فارسی', subsetValue: '✅' },
  //           { subsetName: 'کلید روشن و خاموش', subsetValue: '❌' },
  //           { subsetName: 'صفحه نمایش', subsetValue: '❌' }
  //         ]
  //       }
  //     ],
  //     3
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'ریزر',
  //     'موس گیمینگ',
  //     '7700000',
  //     '/images/Lajitec.png',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     5,
  //     [
  //       {
  //         titleName: 'مشخصات فیزیکی',
  //         subset: [
  //           { subsetName: 'ابعاد', subsetValue: '55.80x 70.51 x 27 میلی‌متر' },
  //           { subsetName: 'وزن', subsetValue: '60±5 گرم' },
  //           { subsetName: 'تعداد کلیدها', subsetValue: '4 کلید' },
  //           { subsetName: 'کلید روشن و خاموش', subsetValue: 'نامشخص' },
  //           { subsetName: 'رنگ', subsetValue: 'مشکی' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات فنی',
  //         subset: [
  //           { subsetName: 'نوع اتصال', subsetValue: 'بی‌سیم' },
  //           { subsetName: 'نوع رابط', subsetValue: 'بلوتوث، دانگل USB' },
  //           { subsetName: 'جنس رابط', subsetValue: 'USB' },
  //           { subsetName: 'نوع حسگر', subsetValue: 'PAW-3212' },
  //           { subsetName: 'محدوده دقت', subsetValue: 'نامشخص' },
  //           { subsetName: 'دقت', subsetValue: 'نامشخص' },
  //           { subsetName: 'طول کابل', subsetValue: '❌' },
  //           { subsetName: 'جنس کابل', subsetValue: '❌' },
  //           { subsetName: 'ضربه‌پذیری کلیدها', subsetValue: 'نامشخص' },
  //           {
  //             subsetName: 'قابلیت کارکردن با هر دو دست',
  //             subsetValue: 'قابلیت اتصال به 3 دستگاه بلوتوثی به طور همزمان، اسکرول لمسی، دارای لیزر برای ارائه'
  //           }
  //         ]
  //       }
  //     ],
  //     2
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'لاجیتک',
  //     'کیبورد گیمینگ',
  //     '7200000',
  //     'https://wolflandshop.com/wp-content/uploads/2023/03/68-11.jpg',
  //     [
  //       'https://resource.logitechg.com/w_572,c_lpad,ar_4:3,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-braid/flying-v-mx-g512/g512-keyboard-gallery-2-2x-nb.png?v=1',
  //       'https://resource.logitechg.com/w_572,c_lpad,ar_4:3,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/products/gaming/keyboards/g512-mechanical-gaming-keyboard/920-008762/g512-backlit-mechanical-gaming-keyboard-23.png?v=1',
  //       'https://resource.logitechg.com/w_80,h_50,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/non-braid/flying-v-mx-g512/g512-keyboard-gallery-3-2x-nb.png?v=1'
  //     ],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     3,
  //     [
  //       {
  //         titleName: 'مشخصات فیزیکی',
  //         subset: [
  //           { subsetName: 'ابعاد', subsetValue: '42 × 102 × 311 میلی‌متر' },
  //           { subsetName: 'وزن', subsetValue: '530 گرم' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات کیبورد',
  //         subset: [
  //           { subsetName: 'نوع رابط', subsetValue: 'بلوتوث، دانگل USB' },
  //           { subsetName: 'ورودی USB', subsetValue: '❌' },
  //           { subsetName: 'ورودی میکروفن و هدفون', subsetValue: '❌' },
  //           { subsetName: 'تاچ پد', subsetValue: '❌' },
  //           { subsetName: 'چراغ‌ پس‌زمینه صفحه کلید', subsetValue: '❌' },
  //           { subsetName: 'سازگار با سیستم عامل‌ها', subsetValue: 'Windows, MacOS, Linux' },
  //           { subsetName: 'نوع اتصال', subsetValue: 'بی‌سیم' },
  //           { subsetName: 'تعداد کلیدها', subsetValue: '68 کلید - نیمه مکانیکال ♦ دارای قابلیت Anti Ghosting بر روی 26 کلید' },
  //           { subsetName: 'تعداد کلیدهای میانبر', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در مقابل نفوذ مایعات', subsetValue: 'نامشخص' },
  //           { subsetName: 'طول کابل', subsetValue: 'نامشخص' },
  //           { subsetName: 'منبع تغذیه', subsetValue: 'باتری داخلی قابل شارژ با Type-C ♦ ظرفیت باتری: ۴۰۰ میلی‌آمپر' },
  //           { subsetName: 'مقاوم در برابر رطوبت', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در برابر گرد و غبار', subsetValue: 'نامشخص' },
  //           { subsetName: 'نمایشگر میزان باتری صفحه کلید', subsetValue: '❌' },
  //           { subsetName: 'حروف حک شده فارسی', subsetValue: 'نامشخص' },
  //           { subsetName: 'کلید روشن و خاموش', subsetValue: '✅' },
  //           { subsetName: 'صفحه نمایش', subsetValue: '❌' }
  //         ]
  //       }
  //     ],
  //     4,
  //     '25'
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'تسکو',
  //     'کیبورد گیمینگ',
  //     '4600000',
  //     'https://tsco.ir/wp-content/uploads/2022/08/1080-2.jpg',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     4,
  //     [
  //       {
  //         titleName: 'مشخصات فیزیکی',
  //         subset: [
  //           { subsetName: 'ابعاد', subsetValue: '42 × 102 × 311 میلی‌متر' },
  //           { subsetName: 'وزن', subsetValue: '530 گرم' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات کیبورد',
  //         subset: [
  //           { subsetName: 'نوع رابط', subsetValue: 'بلوتوث، دانگل USB' },
  //           { subsetName: 'ورودی USB', subsetValue: '❌' },
  //           { subsetName: 'ورودی میکروفن و هدفون', subsetValue: '❌' },
  //           { subsetName: 'تاچ پد', subsetValue: '❌' },
  //           { subsetName: 'چراغ‌ پس‌زمینه صفحه کلید', subsetValue: '❌' },
  //           { subsetName: 'سازگار با سیستم عامل‌ها', subsetValue: 'Windows, MacOS, Linux' },
  //           { subsetName: 'نوع اتصال', subsetValue: 'بی‌سیم' },
  //           { subsetName: 'تعداد کلیدها', subsetValue: '68 کلید - نیمه مکانیکال ♦ دارای قابلیت Anti Ghosting بر روی 26 کلید' },
  //           { subsetName: 'تعداد کلیدهای میانبر', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در مقابل نفوذ مایعات', subsetValue: 'نامشخص' },
  //           { subsetName: 'طول کابل', subsetValue: 'نامشخص' },
  //           { subsetName: 'منبع تغذیه', subsetValue: 'باتری داخلی قابل شارژ با Type-C ♦ ظرفیت باتری: ۴۰۰ میلی‌آمپر' },
  //           { subsetName: 'مقاوم در برابر رطوبت', subsetValue: 'نامشخص' },
  //           { subsetName: 'مقاوم در برابر گرد و غبار', subsetValue: 'نامشخص' },
  //           { subsetName: 'نمایشگر میزان باتری صفحه کلید', subsetValue: '❌' },
  //           { subsetName: 'حروف حک شده فارسی', subsetValue: 'نامشخص' },
  //           { subsetName: 'کلید روشن و خاموش', subsetValue: '✅' },
  //           { subsetName: 'صفحه نمایش', subsetValue: '❌' }
  //         ]
  //       }
  //     ],
  //     5
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'لاجیتک',
  //     'موس گیمینگ',
  //     '5300000',
  //     'https://toosarax.com/wp-content/uploads/2023/08/001-9.jpg',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     1,
  //     [
  //       {
  //         titleName: 'مشخصات فیزیکی',
  //         subset: [
  //           { subsetName: 'ابعاد', subsetValue: 'نامشخص' },
  //           { subsetName: 'وزن', subsetValue: 'نامشخص' },
  //           { subsetName: 'تعداد کلیدها', subsetValue: '6 کلید' },
  //           { subsetName: 'کلید روشن و خاموش', subsetValue: '❌' },
  //           { subsetName: 'رنگ', subsetValue: 'مشکی' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات فنی',
  //         subset: [
  //           { subsetName: 'نوع اتصال', subsetValue: 'با سیم (USB)' },
  //           { subsetName: 'نوع رابط', subsetValue: 'USB Type-A' },
  //           { subsetName: 'جنس رابط', subsetValue: 'USB' },
  //           { subsetName: 'نوع حسگر', subsetValue: 'اپتیکال' },
  //           { subsetName: 'محدوده دقت', subsetValue: 'بیشتر از 3200' },
  //           { subsetName: 'دقت', subsetValue: '3600DPI ♦ (3600 | 2400 | 1800 | 1200)' },
  //           { subsetName: 'طول کابل', subsetValue: 'حدود 1.5 متر' },
  //           { subsetName: 'جنس کابل', subsetValue: 'پلاستیک' },
  //           { subsetName: 'ضربه‌پذیری کلیدها', subsetValue: 'تا 10.000.000 بار کلیک' },
  //           { subsetName: 'قابلیت کارکردن با هر دو دست', subsetValue: '❌' }
  //         ]
  //       }
  //     ],
  //     4,
  //     '15'
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'ریزر',
  //     'هدفن گیمینگ',
  //     '6520400',
  //     'https://ayandehit.com/media_root/images/products/Razer-Kraken-X-Lite.jpg',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     5,
  //     [
  //       {
  //         titleName: 'مشخصات کلی',
  //         subset: [
  //           { subsetName: 'قابلیت پخش موسیقی', subsetValue: '✅' },
  //           { subsetName: 'قابلیت کنترل صدا و موزیک', subsetValue: '✅' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات هدفون',
  //         subset: [
  //           { subsetName: 'امپدانس', subsetValue: 'نامشخص' },
  //           { subsetName: 'پاسخ فرکانسی', subsetValue: '20—20000 هرتز' },
  //           { subsetName: 'حساسیت', subsetValue: 'بیش از 80dB' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات دیگر',
  //         subset: [
  //           { subsetName: 'وزن', subsetValue: '215 گرم' },
  //           { subsetName: 'برد بلوتوث', subsetValue: '10 متر' }
  //         ]
  //       }
  //     ],
  //     3
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'تسکو',
  //     'هدفن گیمینگ',
  //     '3200000',
  //     'https://www.tsco.shop/wp-content/uploads/2022/11/TSCO-TH5151-Gaming-Headset-tsco.shop-4.jpg',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     4,
  //     [
  //       {
  //         titleName: 'مشخصات کلی',
  //         subset: [
  //           { subsetName: 'قابلیت پخش موسیقی', subsetValue: '✅' },
  //           { subsetName: 'قابلیت کنترل صدا و موزیک', subsetValue: '✅' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات هدفون',
  //         subset: [
  //           { subsetName: 'امپدانس', subsetValue: 'نامشخص' },
  //           { subsetName: 'پاسخ فرکانسی', subsetValue: '20—20000 هرتز' },
  //           { subsetName: 'حساسیت', subsetValue: 'بیش از 80dB' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات دیگر',
  //         subset: [
  //           { subsetName: 'وزن', subsetValue: '215 گرم' },
  //           { subsetName: 'برد بلوتوث', subsetValue: '10 متر' }
  //         ]
  //       }
  //     ],
  //     5
  //   ),
  //   new ProductClass(
  //     true,
  //     'computer',
  //     'لاجیتک',
  //     'هدفن گیمینگ',
  //     '4600000',
  //     'https://espeero.com/wp-content/uploads/2019/05/IMG_0556.png',
  //     [],
  //     ['18 ماه گارانتی', '12 ماه گارانتی'],
  //     3,
  //     [
  //       {
  //         titleName: 'مشخصات کلی',
  //         subset: [
  //           { subsetName: 'قابلیت پخش موسیقی', subsetValue: '✅' },
  //           { subsetName: 'قابلیت کنترل صدا و موزیک', subsetValue: '✅' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات هدفون',
  //         subset: [
  //           { subsetName: 'امپدانس', subsetValue: 'نامشخص' },
  //           { subsetName: 'پاسخ فرکانسی', subsetValue: '20—20000 هرتز' },
  //           { subsetName: 'حساسیت', subsetValue: 'بیش از 80dB' }
  //         ]
  //       },
  //       {
  //         titleName: 'مشخصات دیگر',
  //         subset: [
  //           { subsetName: 'وزن', subsetValue: '215 گرم' },
  //           { subsetName: 'ظرفیت باتری', subsetValue: '500mAh' }
  //         ]
  //       }
  //     ],
  //     4
  //   )
  // ];

  private productsPreview: ProductPreviewFrontendModel[] = []

  getProductsPreview() {
    let products;
    let p = this.getProductsPreviewBackendList();
    p.subscribe(r => {
      r.subscribe(res => {
        products = res;
        console.log(products)// moshek dare bayad type dade ham behesh bedim !
      });
    });
    console.log()
    return this.productsPreview;
  }


  getProductsPreviewBackendList() {
    return of(this.httpService.get("http://localhost:5145/api/v1/productsprevirw/list"));
  }

  getProducts() {
    return of(this.httpService.get("http://localhost:5145/api/v1/products/list"));
  }

  async getProduct(productId: string) {
    return await this.httpService.get("http://localhost:5145/api/v1/products/getproduct" + productId).toPromise();
  }

  addProduct(product: AddProductModel) {
    let p = {
      isAvailable: product.isAvailable,
      category: product.category,
      brand: product.brand,
      title: product.title,
      price: product.price,
      discountPercent: product.discountPercent,
      previewImageUrl: product.previewImageUrl,
      description: product.description,
      review: product.review,
      maxCount: product.maxCount,
      scoreRank: product.scoreRank,
      imagesUrl: product.imagesUrls,
      // garrantys: product.garrantys,
      // attributes: product.attributes,
    }

    return of(this.httpService.post("http://localhost:5145/api/v1/products/create", p));
  }

  deleteProduct(productId: string) {
    return of(this.httpService.delete("http://localhost:5145/api/v1/products/delete/" + productId, {}));
  }

  editProduct(product: Product) {
    return of(this.httpService.put("http://localhost:5145/api/v1/products/edit/" + product.id, product));
  }
}
