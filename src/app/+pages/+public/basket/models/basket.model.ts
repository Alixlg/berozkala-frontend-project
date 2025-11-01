import { GarrantyModel } from "../../../+private/+admin-panel/add-product/models/product-add.model";
import { ProductPreviewModel } from "../../products/ui/product-preview/models/productPreview.model";

export interface GetBasketProductModel {
  id: string;
  product: ProductPreviewModel;
  productCount: number;
  selectedGarranty?: GarrantyModel;
}

export interface ProductToBasket {
  productId: string;
  selectedGarranty?: string;
}
