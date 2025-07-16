export interface ProductBackendModel {
  id: string;
  dateToAdd: string;
  isAvailable: boolean;
  category: string;
  brand: string;
  title: string;
  price: number;
  discountPercent: number;
  previewImageUrl: string;
  imagesUrl: string[];
  description: string;
  review: string;
  maxCount: number;
  scoreRank: number;
  // garranty: string[];
  // count: number;
  // attributes: {
  //   titleName: string,
  //   subset: { subsetName: string, subsetValue: string }[]
  // }[];
}

export interface Product {
  id: string;
  isAvailable: boolean;
  category: string;
  brand: string;
  title: string;
  price: number;
  discountPercent: number;
  previewImageUrl: string;
  description: string;
  review: string;
  count: number;
  maxCount: number;
  scoreRank: number;
  dateToAdd: string;
  imagesUrl: string[];
  garranty: string[];
  attributes: { titleName: string; subset: { subsetName: string; subsetValue: string; }[]; }[];
}
