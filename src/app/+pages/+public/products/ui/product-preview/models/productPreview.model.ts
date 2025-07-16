import { Product } from "../../../../../../+shared/models/product.model";

export interface ProductPreviewBackendModel {
  id: number;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  pic: string;
  count: number;
  maxCount: number;
  scoreRank: number;
}

export interface ProductPreviewFrontendModel {
  id: number;
  brand: string;
  title: string;
  price: string;
  discountPercent: string;
  pic: string;
  count: number;
  maxCount: number;
  scoreRank: number;
  category: string;
  isAddDisable :boolean;
  isRemoveDisable :boolean;
}
