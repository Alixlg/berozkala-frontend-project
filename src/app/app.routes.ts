import { Routes } from '@angular/router';
import { PublicNavigationsComponent } from './+navigations/public-navigations/ui/public-navigations.component';
import { ProductsComponent } from './+pages/+public/products/ui/products.component';
import { BasketComponent } from './+pages/+public/basket/ui/basket.component';
import { AboutComponent } from './+pages/+public/about/ui/about.component';
import { SupportComponent } from './+pages/+public/support/ui/support.component';
import { HomeComponent } from './+pages/+public/home/ui/home.component';
import { VideosComponent } from './+pages/+public/videos/ui/videos.component';
import { RegisterComponent } from './+pages/+public/register/ui/register.component';
import { AdminPanelNavigationsComponent } from './+navigations/admin-panel-navigations/ui/admin-panel-navigations.component';
import { UserPanelNavigationsComponent } from './+navigations/user-panel-navigations/ui/user-panel-navigations.component';
import { AdminDashboardComponent } from './+pages/+private/+admin-panel/admin-dashboard/ui/admin-dashboard.component';
import { ProductComponent } from './+pages/+public/products/ui/product/ui/product.component';
import { NotFoundPageComponent } from './+components/not-found-page/not-found-page.component';
import { AddProductComponent } from './+pages/+private/+admin-panel/add-product/ui/add-product.component';
import { ProductListComponent } from './+pages/+private/+admin-panel/product-list/ui/product-list.component';
import { LoginComponent } from './+pages/+public/login/ui/login.component';
import { AdminLoginComponent } from './+pages/+private/admin-login/ui/admin-login.component';

export const routes: Routes = [
  {
    path: 'pb', component: PublicNavigationsComponent, children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'products', component: ProductsComponent, children: [
          { path: ':category/:id', component: ProductComponent },
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
      { path: 'product-list', component: ProductListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  {
    path: 'user-panel', component: UserPanelNavigationsComponent, children: []
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '', redirectTo: '/pb', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];
