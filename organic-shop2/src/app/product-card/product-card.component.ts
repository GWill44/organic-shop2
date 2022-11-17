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
  @Input('shopping-cart') shoppingCart : any;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  addToCart(product: Product) {
    void this.shoppingCartService.addToCart(product);
  }

  getQuantity() {
    if(this.product){
      let item = this.shoppingCart.items[this.product.key!];
      return (item) ? item.quantity : 0;
    }
  }
}
