import { Product } from "../+pages/+public/products/ui/product-preview/models/product";

export class ProductBody implements Product {
  private static _id = 1001;
  id = 1001;
  brand = '';
  title = '';
  price = '';
  pic = '';
  discountPercent = '';
  count = 1;
  scoreRank = 1;
  isAddDisable = false;
  isRemoveDisable = false;

  constructor(brand: string, title: string, price: string, pic: string, scoreRank: number, discountPercent: string = '0') {
    this.id = ProductBody._id++;
    this.brand = brand;
    this.title = title;
    this.price = price;
    this.pic = pic;
    this.discountPercent = discountPercent;
    this.scoreRank = scoreRank;
  }
}
