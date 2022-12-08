import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {HomeComponent} from './core/components/home/home.component';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping/components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './shopping/components/check-out/check-out.component';
import {OrderSuccessComponent} from './shopping/components/order-success/order-success.component';
import {MyOrdersComponent} from './shopping/components/my-orders/my-orders.component';
import {AdminProductsComponent} from './admin/components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {LoginComponent} from './core/components/login/login.component';
import {ProductFormComponent} from './admin/components/product-form/product-form.component';

import {AuthGuard} from "./shared/services/auth-guard.service";

import {AdminAuthGuard} from "./admin/services/admin-auth-guard.service";


import {environment} from '../environments/environment';

import {DataTablesModule} from "angular-datatables";
import {ProductFilterComponent} from './products/product-filter/product-filter.component';
import {ShoppingCartSummaryComponent} from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import {ShippingFormComponent} from './shopping/components/shipping-form/shipping-form.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
    imports: [
        BrowserModule,
      SharedModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'store', component: ProductsComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'shopping-cart', component: ShoppingCartComponent},
            {path: 'login', component: LoginComponent},
            {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
            {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
            {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

            {
                path: 'admin/products/new',
                component: ProductFormComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
            {
                path: 'admin/products/:id',
                component: ProductFormComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
            {
                path: 'admin/products',
                component: AdminProductsComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
            {
                path: 'admin/orders',
                component: AdminOrdersComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            }
        ]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        DataTablesModule
    ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
