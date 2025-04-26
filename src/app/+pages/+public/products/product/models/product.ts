export interface IProduct {
  id: number;
  isAvailable: boolean;
  category: string;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  previewImageUrl: string;
  imagesUrl: string[];
  garranty: string[];//
  count: number;
  maxCount: number;
  scoreRank: number;
  specifications: {
    titleName: string,
    subset: { subsetName: string, subsetValue: string }[]
  }[];
}

export class Product implements IProduct {
  private static _id = 1001;
  id: number = 1001;
  isAvailable: boolean;
  category: string;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  previewImageUrl: string;
  imagesUrl: string[];
  garranty: string[];
  count: number = 1;
  maxCount: number;
  scoreRank: number;
  specifications: { titleName: string; subset: { subsetName: string; subsetValue: string; }[]; }[];

  constructor (
    isAvailable: boolean,
    category: string,
    brand: string,
    title: string,
    price: string,
    previewImageUrl: string,
    imagesUrl: string[],
    garranty: string[],
    maxCount: number,
    specifications: {
      titleName: string;
      subset: { subsetName: string; subsetValue: string; }[];
    }[],
    scoreRank: number = 1,
    discountPercent: string = '0') {

    this.id = Product._id++;
    this.isAvailable = isAvailable;
    this.category = category;
    this.brand = brand;
    this.title = title;
    this.price = price;
    this.previewImageUrl = previewImageUrl;
    this.imagesUrl = imagesUrl;
    this.garranty = garranty;
    this.maxCount = maxCount;
    this.specifications = specifications;
    this.scoreRank = scoreRank;
    this.discountPercent = discountPercent;
  }
}
