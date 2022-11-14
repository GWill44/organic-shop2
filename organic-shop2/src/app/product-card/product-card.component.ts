import {Component, Input} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product : Product | undefined;
  @Input('show-actions') showActions : Boolean = true;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  addToCart(product: Product){
    void this.shoppingCartService.addToCart(product);
  }

}
