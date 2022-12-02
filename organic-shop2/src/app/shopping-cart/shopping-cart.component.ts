import { Component, OnInit } from '@angular/core';
import {ShoppingCart} from "../models/shopping-cart";
import {Observable} from "rxjs";
import {ShoppingCartService} from "../shopping-cart.service";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
