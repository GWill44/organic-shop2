import {ShoppingCart} from "./shopping-cart";

export class Order {
  datePlaced: number;
  items: any[];

  constructor(userId: string, shipping: any, shoppingCart: ShoppingCart){
    this.datePlaced = new Date().getTime();
    this.items = this.mapOrderItems(shoppingCart);
  }

  mapOrderItems(shoppingCart: ShoppingCart) {
    return shoppingCart.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }
    });
  }
}
