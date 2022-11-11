import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth-guard.service";
import { UserService } from "./user.service";
import { AdminAuthGuard } from "./admin-auth-guard.service";
import { CategoryService } from "./category.service";

import { environment } from '../environments/environment';
import {ProductService} from "./product.service";
import {DataTablesModule} from "angular-datatables";
import { StoreComponent } from './store/store.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';

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
    StoreComponent,
    ProductFilterComponent
  ],
    imports: [
        BrowserModule,
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
            {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
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
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
