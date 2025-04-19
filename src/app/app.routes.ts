import { Routes } from '@angular/router';
import { PublicNavigationsComponent } from './+navigations/public-navigations/ui/public-navigations.component';
import { PrivateNavigationsComponent } from './+navigations/private-navigations/ui/private-navigations.component';
import { ProductsComponent } from './+pages/+public/products/ui/products.component';
import { BasketComponent } from './+pages/+public/basket/ui/basket.component';
import { LoginComponent } from './+pages/+public/login/ui/login.component';
import { ManageProductsComponent } from './+pages/+private/admin-panel/manage-products/ui/manage-products.component';
import { ManageMembersComponent } from './+pages/+private/admin-panel/manage-members/ui/manage-members.component';
import { AboutComponent } from './+pages/+public/about/ui/about.component';
import { SupportComponent } from './+pages/+public/support/ui/support.component';
import { HomeComponent } from './+pages/+public/home/ui/home.component';
import { AdminPanelComponent } from './+pages/+private/admin-panel/ui/admin-panel.component';
import { UserPanelComponent } from './+pages/+private/user-panel/ui/user-panel.component';
import { VideosComponent } from './+pages/+public/videos/ui/videos.component';
import { RegisterComponent } from './+pages/+public/register/ui/register.component';
import { WithPasswordComponent } from './+pages/+public/login/with-password/ui/with-password.component';
import { WithVerifyCodeComponent } from './+pages/+public/login/with-verify-code/ui/with-verify-code.component';
import { ForgetPasswordComponent } from './+pages/+public/login/forget-password/ui/forget-password.component';
import { ManageBasketComponent } from './+pages/+public/basket/manage-basket/ui/manage-basket.component';
import { CheckoutComponent } from './+pages/+public/basket/checkout/ui/checkout.component';
import { PaymentComponent } from './+pages/+public/basket/payment/ui/payment.component';

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
    path: 'pr', component: PrivateNavigationsComponent, children: [
      {
        path: 'admin-panel', component: AdminPanelComponent, children: [
          { path: 'manage-products', component: ManageProductsComponent },
          { path: 'manage-members', component: ManageMembersComponent },
          { path: '', redirectTo: 'manage-products', pathMatch: 'prefix' }
        ]
      },
      { path: 'user-panel', component: UserPanelComponent, children: [] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
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
