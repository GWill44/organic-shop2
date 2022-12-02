import {ShoppingCartItem} from "./shopping-cart-item";
import {Product} from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for(let productId in itemsMap) {
      let item = itemsMap[productId]
      this.items.push(new ShoppingCartItem({
        key: productId,
        title: item.title,
        imageUrl: item.imageUrl,
        category: item.category,
        price: item.price,
        quantity: item.quantity
      }));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key!];
    return (item) ? item.quantity : 0;
  }

  mapCheckOutItems() {
    return this.items.map(x => {
      return {
        product: {
          title: x.title,
          imageUrl: x.imageUrl,
          price: x.price
        },
        quantity: x.quantity,
        totalPrice: x.totalPrice
      }
    });
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) count += this.itemsMap[productId].quantity!;
    return count;
  }
  get totalPrice() {
    let sum = 0;
    for(let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }
}
