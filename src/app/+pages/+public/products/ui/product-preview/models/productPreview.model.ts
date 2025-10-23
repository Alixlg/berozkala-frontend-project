export interface ProductPreviewModel {
  id: string;
  isAvailable: boolean;
  brand: string;
  title: string;
  price: number;
  maxCount: number;
  scoreRank: number;
  discountPercent: number;
  previewImageUrl?: string;
}

export interface ProductPreviewFrontendModel extends ProductPreviewModel {
  count: number;
  isAddDisable: boolean;
  isRemoveDisable: boolean;
}

