export interface AddProductModel {
  isAvailable: boolean;
  category: string;
  brand: string;
  title: string;
  price: number;
  discountPercent: number;
  previewImageUrl: string;
  description: string;
  review: string;
  maxCount: number;
  scoreRank: number;
  imagesUrl: string[];
  garranty: string[];
  attributes: {
    titleName: string,
    subset: { subsetName: string, subsetValue: string }[]
  }[];
}
