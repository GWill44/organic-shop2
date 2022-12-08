import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AppUser} from "../../../shared/models/app-user";
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {ShoppingCart} from "../../../shared/models/shopping-cart";
import {Observable} from "rxjs";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  appUser: AppUser | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
