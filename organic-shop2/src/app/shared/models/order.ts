import {ShoppingCart} from "./shopping-cart";
import {Shipping} from "./shipping";

export class Order {
  datePlaced: number;
  items: any[];
  shipping: Shipping;
  userId: string;
  total: number;

  constructor(userId: string, shippingDetails: Shipping, shoppingCart: ShoppingCart){
    this.datePlaced = new Date().getTime();
    this.items = this.mapOrderItems(shoppingCart);
    this.shipping = shippingDetails;
    this.userId = userId;
    this.total = this.orderTotal(this.items);
  }

  orderTotal(items: any){
    let total = 0;
    for(let item of items) total += item.totalPrice;
    return total;
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
