import {Component, Input} from '@angular/core';
import {Product} from "../../models/product";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product : Product | undefined;
  @Input('show-actions') showActions : Boolean = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart | undefined;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(){
    this.shoppingCartService.addToCart(this.product!);
  }


}
