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
import { WithPasswordComponent } from './+pages/+public/login/with-password/ui/with-password.component';
import { WithVerifyCodeComponent } from './+pages/+public/login/with-verify-code/ui/with-verify-code.component';
import { ForgetPasswordComponent } from './+pages/+public/login/forget-password/ui/forget-password.component';
import { ManageBasketComponent } from './+pages/+public/basket/manage-basket/ui/manage-basket.component';
import { CheckoutComponent } from './+pages/+public/basket/checkout/ui/checkout.component';
import { PaymentComponent } from './+pages/+public/basket/payment/ui/payment.component';
import { AdminPanelNavigationsComponent } from './+navigations/admin-panel-navigations/ui/admin-panel-navigations.component';
import { UserPanelNavigationsComponent } from './+navigations/user-panel-navigations/ui/user-panel-navigations.component';
import { AddProductComponent } from './+pages/+private/+admin-panel/manage-products/add-product/ui/add-product.component';
import { EditProductComponent } from './+pages/+private/+admin-panel/manage-products/edit-product/ui/edit-product.component';
import { RemoveProductComponent } from './+pages/+private/+admin-panel/manage-products/remove-product/ui/remove-product.component';
import { AdminDashboardComponent } from './+pages/+private/+admin-panel/admin-dashboard/ui/admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'pb', component: PublicNavigationsComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'basket', component: BasketComponent, children: [
          { path: 'manage-basket', component: ManageBasketComponent },
          { path: 'checkout', component: CheckoutComponent },
          { path: 'payment', component: PaymentComponent },
          { path: '', redirectTo: 'manage-basket', pathMatch: 'prefix' }
        ]
      },
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
      { path: '', redirectTo: 'with-password', pathMatch: 'prefix' }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'pb', pathMatch: 'full' }
];
