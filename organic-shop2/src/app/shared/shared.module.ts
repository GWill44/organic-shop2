import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {ProductQuantityComponent} from "./components/product-quantity/product-quantity.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {AdminAuthGuard} from "../admin/services/admin-auth-guard.service";
import {UserService} from "./services/user.service";
import {CategoryService} from "./services/category.service";
import {ProductService} from "./services/product.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {OrderService} from "./services/order.service";
import {ProductMapperService} from "./services/product-mapper.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    ProductMapperService
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ]
})
export class SharedModule { }
