import {ShoppingCartItem} from "./shopping-cart-item";

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get totalItemsCount() {
    let count = 0;
    for (let product in this.items) count += this.items[product].quantity;
    return count;
  }
}
