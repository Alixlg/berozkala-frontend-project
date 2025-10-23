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
import { NotFoundPageComponent } from './+components/not-found-page/not-found-page.component';
import { AddProductComponent } from './+pages/+private/+admin-panel/add-product/ui/add-product.component';
import { ProductListComponent } from './+pages/+private/+admin-panel/product-list/ui/product-list.component';
import { LoginComponent } from './+pages/+public/login/ui/login.component';
import { AdminLoginComponent } from './+pages/+private/admin-login/ui/admin-login.component';
import { isUserGuard } from './+guards/is-user.guard';
import { authGuard } from './+guards/auth.guard';
import { isAdminGuard } from './+guards/is-admin.guard';
import { FavoriteProductsComponent } from './+pages/+private/+user-panel/favorite-products/ui/favorite-products.component';
import { OrderListComponent } from './+pages/+private/+user-panel/order-list/ui/order-list.component';
import { PaymentsComponent } from './+pages/+public/basket/ui/payment/ui/payments.component';
import { ManageAddressesComponent } from './+pages/+private/+shared/manage-addresses/ui/manage-addresses.component';
import { ChangePasswordComponent } from './+pages/+private/+shared/change-password/ui/change-password.component';
import { UserDashboardComponent } from './+pages/+private/+user-panel/user-dashboard/ui/user-dashboard.component';
import { ProfileEditComponent } from './+pages/+private/+shared/profile-edit/ui/profile-edit.component';
import { ManageCategoryComponent } from './+pages/+private/+admin-panel/manage-category/ui/manage-category.component';
import { ProductComponent } from './+pages/+public/products/ui/product/ui/product.component';

export const routes: Routes = [
  {
    path: 'pb', component: PublicNavigationsComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'support', component: SupportComponent },
      { path: 'about', component: AboutComponent },
      { path: 'basket', component: BasketComponent, canActivate: [isUserGuard] },
      { path: 'videos', component: VideosComponent },
      { path: '', redirectTo: 'home', pathMatch: 'prefix' }
    ]
  },
  {
    path: 'admin-panel', component: AdminPanelNavigationsComponent, canActivate: [isAdminGuard], children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-profile', component: ProfileEditComponent },
      { path: 'manage-category', component: ManageCategoryComponent },
      { path: 'manage-addresses', component: ManageAddressesComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  {
    path: 'user-panel', component: UserPanelNavigationsComponent, canActivate: [isUserGuard], children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'edit-profile', component: ProfileEditComponent },
      { path: 'favorite-products', component: FavoriteProductsComponent },
      { path: 'orders-list', component: OrderListComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'manage-addresses', component: ManageAddressesComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: '404', component: NotFoundPageComponent },
  { path: '', redirectTo: '/pb', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];
