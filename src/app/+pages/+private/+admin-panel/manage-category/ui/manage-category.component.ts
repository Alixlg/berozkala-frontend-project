import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { BackendService } from '../../../../../+shared/services/backend.service';
import { CategoryModel } from '../models/category.model';
import { SubCategoryModel } from '../models/subcategory.model';
import { LoadingService } from '../../../../../+components/loading/service/loading.service';

@Component({
  selector: 'app-manage-category',
  imports: [FormsModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {
  alertService = inject(AlertService);
  backendService = inject(BackendService);
  loadingService = inject(LoadingService);

  categorys: CategoryModel[] = [];
  categoryAddModel: CategoryModel = {
    categoryName: '',
    subCategorys: []
  };
  categoryEditModel: CategoryModel = {
    categoryName: '',
    subCategorys: []
  };

  showAddModal = false;
  showEditModal = false;

  isLoading = false;
  isAddCategoryLoading = false;
  isEditCategoryLoading = false;

  addSubCategory(actionType: string) {
    if (actionType == 'add') {
      this.categoryAddModel.subCategorys?.push({ subCategoryName: '' });
    } else if (actionType == 'edit') {
      this.categoryEditModel.subCategorys?.push({ subCategoryName: '' });
    }
  }

  removeSubCategory(obj: SubCategoryModel, actionType: string) {
    if (actionType == 'add') {
      this.categoryAddModel.subCategorys = this.categoryAddModel.subCategorys?.filter(x => x != obj);
    } else if (actionType == 'edit') {
      if (obj.id) {
        let result = this.backendService.del<string, string[]>('api/v1/subcategorys/delete', [obj.id]);

        result.subscribe({
          next: res => {
            if (res.isSuccess) {
              this.categoryEditModel.subCategorys = this.categoryEditModel.subCategorys?.filter(x => x != obj);
              this.refreshCategoryList();
            }
          }
        });
      } else {
        this.categoryEditModel.subCategorys = this.categoryEditModel.subCategorys?.filter(x => x != obj);
      }
    }
  }

  saveCategory() {
    this.isAddCategoryLoading = true;
    let result = this.backendService.post<string, CategoryModel>('api/v1/category/create', this.categoryAddModel);

    result.subscribe({
      next: res => {
        if (res.isSuccess) {
          this.showAddModal = false;
          this.isAddCategoryLoading = false;
          this.categoryAddModel = { categoryName: '', subCategorys: [] };
          this.refreshCategoryList();
        } else {
          this.isAddCategoryLoading = false;
        }
      },
      error: err => {
        this.isAddCategoryLoading = false;
      }
    });
  }

  deleteCategory(categoryId: string) {
    let result = this.backendService.del<string, string[]>('api/v1/categorys/delete', [categoryId]);

    result.subscribe({
      next: res => {
        if (res.isSuccess) {
          this.refreshCategoryList();
        }
      }
    });
  }

  editCategoryButton(obj: CategoryModel) {
    this.showEditModal = true;
    this.categoryEditModel = obj;
  }

  editCategorySubmited() {
    this.isEditCategoryLoading = true;
    this.loadingService.show();

    let editCategoryResult = this.backendService.put<string, CategoryModel>(`api/v1/category/edit/${this.categoryEditModel.id ?? ""}`, this.categoryEditModel);

    editCategoryResult.subscribe({
      next: res => {
        if (res.isSuccess) {
          this.refreshCategoryList();
        }
        if (index == this.categoryEditModel.subCategorys?.length) {
          this.isEditCategoryLoading = false;
          this.loadingService.hide();
          this.showEditModal = false;
        }
      },
      error: err => {
        if (index == this.categoryEditModel.subCategorys?.length) {
          this.isEditCategoryLoading = false;
          this.loadingService.hide();
          this.showEditModal = false;
        }
      }
    });

    let index = 0;
    this.categoryEditModel.subCategorys?.forEach(x => {
      if (x.id) {
        let result = this.backendService.put<string, SubCategoryModel>(`api/v1/subcategory/edit/${x.id}`, x);
        result.subscribe({
          next: res => {
            index++;
            if (index == this.categoryEditModel.subCategorys?.length) {
              this.isEditCategoryLoading = false;
              this.loadingService.hide();
              this.showEditModal = false;
            }
          },
          error: err => {
            index++;
            if (index == this.categoryEditModel.subCategorys?.length) {
              this.isEditCategoryLoading = false;
              this.loadingService.hide();
              this.showEditModal = false;
            }
          }
        });
      } else {
        let result = this.backendService.post<string, SubCategoryModel>(`api/v1/subcategory/create/${this.categoryEditModel.id ?? ""}`, x);
        result.subscribe({
          next: res => {
            index++;
            if (index == this.categoryEditModel.subCategorys?.length) {
              this.isEditCategoryLoading = false;
              this.loadingService.hide();
              this.showEditModal = false;
            }
          },
          error: err => {
            index++;
            if (index == this.categoryEditModel.subCategorys?.length) {
              this.isEditCategoryLoading = false;
              this.loadingService.hide();
              this.showEditModal = false;
            }
          }
        });
      }
    });
  }

  refreshCategoryList() {
    this.isLoading = true;

    let result = this.backendService.get<CategoryModel[]>('api/v1/category/list');
    result.subscribe({
      next: res => {
        if (res.isSuccess) {
          this.categorys = res.body;
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
        }
      },
      error: err => {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    this.refreshCategoryList();
  }
}
