import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../../+components/alert-system/service/alert.service';
import { AttributeModel, AttributeSubsetModel, GarrantyModel, ProductAddModel } from '../models/product-add.model';
import { CategoryModel } from '../../manage-category/models/category.model';
import { BackendService } from '../../../../../+shared/services/backend.service';

@Component({
  selector: 'app-add-product',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  alertService = inject(AlertService);
  backendService = inject(BackendService);

  categorys!: CategoryModel[];
  selectedCategory: CategoryModel[] = [{ categoryName: '' }];

  productModel: ProductAddModel = {
    isAvailable: true,
    subCategoryIds: [],
    brand: "",
    title: "",
    price: 0,
    discountPercent: 0,
    previewImageUrl: "",
    imagesUrls: [{ imageName: '', imagePath: '' }],
    description: "",
    review: "",
    maxCount: 10,
    scoreRank: 5,
    garrantys: [{ name: '', garrantyCode: 0 }],
    attributes: [{ titleName: '', subsets: [{ name: '', value: '' }] }]
  };

  isSuccessModal: boolean = false;
  isLoadnig: boolean = false;

  addAttributes() {
    this.productModel.attributes!.push({ titleName: '', subsets: [{ name: '', value: '' }] });
  }

  addSubset(attribute: AttributeModel) {
    attribute.subsets.push({ name: '', value: '' });
  }

  addGurranty() {
    this.productModel.garrantys!.push({ garrantyCode: 0, name: '' });
  }

  removeSubsetAttribute(attribute: AttributeModel, subset: AttributeSubsetModel) {
    attribute.subsets = attribute.subsets.filter(s => s != subset);
  }

  removeAttribute(attribute: AttributeModel) {
    this.productModel.attributes = this.productModel.attributes?.filter(a => a != attribute);
  }

  removeGurranty(garranty: GarrantyModel) {
    this.productModel.garrantys = this.productModel.garrantys?.filter(g => g != garranty);
  }

  removeSelectedCategory(catrgory: CategoryModel) {
    this.selectedCategory = this.selectedCategory?.filter(c => c != catrgory);
  }

  updateSubCategorys($event: any, selectCategory: CategoryModel) {
    let category = this.categorys.find(x => x.id == $event.value);
    selectCategory.subCategorys = category?.subCategorys;
  }

  selectSubCategory($event: any) {
    this.productModel.subCategoryIds.push($event.value);
  }

  addProduct() {
    this.isLoadnig = true;
    this.isSuccessModal = true;

    this.productModel.scoreRank = Number(this.productModel.scoreRank);

    let result = this.backendService.post<string, ProductAddModel>('api/v1/products/create', this.productModel);

    result.subscribe({
      next: res => this.isLoadnig = false
      ,
      error: err => this.isLoadnig = false
    });
  }

  ngOnInit(): void {
    let result = this.backendService.get<CategoryModel[]>('api/v1/category/list');
    result.subscribe({
      next: res => {
        this.categorys = res.body;
      },
      error: err => {
        this.alertService.newAlert('هشدار : لیست کتگوری ها از سرویس ها دریافت نشد', 2000, true);
      }
    });
  }
}
