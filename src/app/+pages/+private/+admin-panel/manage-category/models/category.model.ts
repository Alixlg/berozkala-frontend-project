import { SubCategoryModel } from "./subcategory.model";

export interface CategoryModel {
  id?: string;
  categoryName: string;
  subCategorys?: SubCategoryModel[] | null;
}
