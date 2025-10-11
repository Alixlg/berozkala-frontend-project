import { Product } from "../../../../../../+shared/models/product.model";

export interface ProductPreviewBackendModel {
  id?: string;
  isAvailable: boolean;
  brand: string;
  pic: string;
  category: string[];
  title: string;
  price: string;
  discountPercent: string;
  previewImageUrl: string;
  maxCount: number;
  scoreRank: number;
}

export interface ProductPreviewFrontendModel extends ProductPreviewBackendModel {
  count: number;
  isAddDisable: boolean;
  isRemoveDisable: boolean;
}

