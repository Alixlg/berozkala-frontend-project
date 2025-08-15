export interface AddProductModel {
  isAvailable: boolean;
  category: string[];
  brand: string;
  title: string;
  price: number;
  discountPercent: number;
  previewImageUrl: string;
  description: string;
  review: string;
  maxCount: number;
  scoreRank: number;
  imagesUrls: string[];
  garrantys: string[];
  attributes: {
    titleName: string,
    subset: { subsetName: string, subsetValue: string }[]
  }[];
}
