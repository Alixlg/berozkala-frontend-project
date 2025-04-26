import { IProduct } from "../../product/models/product";

export interface Productpw {
  id: number;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  pic: string;
  count: number;
  maxCount: number;
  scoreRank: number;
  isAddDisable: boolean;
  isRemoveDisable: boolean;
}

export class ProductPreview implements Productpw {

  id: number;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  pic: string;
  count: number;
  maxCount: number;
  scoreRank: number;
  isAddDisable = false;
  isRemoveDisable = false;

  constructor(p: IProduct) {
    this.id = p.id;
    this.brand = p.brand;
    this.title = p.title;
    this.price = p.price;
    this.pic = p.previewImageUrl;
    this.discountPercent = p.discountPercent;
    this.scoreRank = p.scoreRank;
    this.count = p.count;
    this.maxCount = p.maxCount;
  }
}
