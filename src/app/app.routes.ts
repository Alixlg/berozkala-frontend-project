import { Routes } from '@angular/router';
import { PublicNavigationsComponent } from './+navigations/public-navigations/ui/public-navigations.component';
import { ProductsComponent } from './+pages/+public/products/ui/products.component';
import { BasketComponent } from './+pages/+public/basket/ui/basket.component';
import { LoginComponent } from './+pages/+public/login/ui/login.component';
import { AboutComponent } from './+pages/+public/about/ui/about.component';
import { SupportComponent } from './+pages/+public/support/ui/support.component';
import { HomeComponent } from './+pages/+public/home/ui/home.component';
import { VideosComponent } from './+pages/+public/videos/ui/videos.component';
import { RegisterComponent } from './+pages/+public/register/ui/register.component';
import { AdminPanelNavigationsComponent } from './+navigations/admin-panel-navigations/ui/admin-panel-navigations.component';
import { UserPanelNavigationsComponent } from './+navigations/user-panel-navigations/ui/user-panel-navigations.component';
import { AdminDashboardComponent } from './+pages/+private/+admin-panel/admin-dashboard/ui/admin-dashboard.component';
import { AddProductComponent } from './+pages/+private/+admin-panel/manage-products/ui/add-product/ui/add-product.component';
import { RemoveProductComponent } from './+pages/+private/+admin-panel/manage-products/ui/remove-product/ui/remove-product.component';
import { EditProductComponent } from './+pages/+private/+admin-panel/manage-products/ui/edit-product/ui/edit-product.component';
import { ForgetPasswordComponent } from './+pages/+public/login/ui/forget-password/ui/forget-password.component';
import { WithVerifyCodeComponent } from './+pages/+public/login/ui/with-verify-code/ui/with-verify-code.component';
import { WithPasswordComponent } from './+pages/+public/login/ui/with-password/ui/with-password.component';
import { ProductComponent } from './+pages/+public/products/ui/product/ui/product.component';
import { NotFoundPageComponent } from './+components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: 'pb', component: PublicNavigationsComponent, children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'products', component: ProductsComponent, children: [
          { path: 'computer/:id', component: ProductComponent },
          { path: '404', component: NotFoundPageComponent },
          { path: '', redirectTo: 'products', pathMatch: 'prefix' }
        ]
      },
      { path: 'support', component: SupportComponent },
      { path: 'about', component: AboutComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'videos', component: VideosComponent },
      { path: '', redirectTo: 'home', pathMatch: 'prefix' }
    ]
  },
  {
    path: 'admin-panel', component: AdminPanelNavigationsComponent, children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'remove-product', component: RemoveProductComponent },
      { path: 'edit-product', component: EditProductComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  {
    path: 'user-panel', component: UserPanelNavigationsComponent, children: [

    ]
  },
  {
    path: 'login', component: LoginComponent, children: [
      { path: 'with-password', component: WithPasswordComponent },
      { path: 'with-verify-code', component: WithVerifyCodeComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: '', redirectTo: 'with-password', pathMatch: 'prefix' },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];
