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
    let cartId = localStorage.getItem('cartId');
    if(!cartId) {
      this.shoppingCartService.create().then( result => {
        if (result.key) {
          localStorage.setItem('cartId', result.key);
        }
      })
    }
  }

}
