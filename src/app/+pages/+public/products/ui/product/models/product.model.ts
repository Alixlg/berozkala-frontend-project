
export interface ProductModel {
  id: string;
  dateToAdd: string;
  isAvailable: boolean;
  brand: string;
  title: string;
  category: SubCategoryModel[];
  price: number;
  maxCount: number;
  scoreRank: number;
  discountPercent: number;
  previewImageUrl?: string;
  imagesUrls?: ImageModel[];
  description?: string;
  review?: string;
  garrantys?: GarrantyModel[];
  attributes?: AttributeModel[];
}

export interface AttributeSubsetModel {
  id?: string;
  name: string;
  value: string;
}

export interface AttributeModel {
  id?: string;
  titleName: string;
  subsets: AttributeSubsetModel[];
}

export interface GarrantyModel {
  id?: string;
  name: string;
  garrantyCode: number;
}

export interface ImageModel {
  id?: string;
  imagePath: string;
  imageName?: string;
}

export interface SubCategoryModel {
  id: string;
  subCategoryName: string;
}
