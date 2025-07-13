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
  garranty: string[];
  description: string;
  review: string;
  count: number;
  maxCount: number;
  scoreRank: number;
  addDate: string;
  attributes: {
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
  description: string;
  review: string;
  count: number = 1;
  maxCount: number;
  scoreRank: number;
  addDate: string = "";
  attributes: { titleName: string; subset: { subsetName: string; subsetValue: string; }[]; }[];

  constructor(
    isAvailable: boolean,
    category: string,
    brand: string,
    title: string,
    price: string,
    previewImageUrl: string,
    imagesUrl: string[],
    garranty: string[],
    maxCount: number,
    attributes: {
      titleName: string;
      subset: { subsetName: string; subsetValue: string; }[];
    }[],
    scoreRank: number = 1,
    discountPercent: string = '0',
    description: string = "",
    review: string = "") {

    this.id = Product._id++;
    this.isAvailable = isAvailable;
    this.category = category;
    this.brand = brand;
    this.title = title;
    this.price = price;
    this.previewImageUrl = previewImageUrl;
    this.imagesUrl = imagesUrl;
    this.garranty = garranty;
    this.description = description;
    this.review = review;
    this.maxCount = maxCount;
    this.attributes = attributes;
    this.scoreRank = scoreRank;
    this.discountPercent = discountPercent;
  }
}
