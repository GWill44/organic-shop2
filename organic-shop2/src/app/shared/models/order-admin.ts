import {Order} from "./order";

export class OrderAdmin {
  orderId: string;
  order: Order;
  itemCount: number;

  constructor(orderId: string, order: Order) {
    this.orderId = orderId;
    this.order = order;

    let itemCount = 0;
    for(let i = 0; i < order.items.length; i++) {
      itemCount += order.items[i].quantity;
    }

    this.itemCount = itemCount;
  }
}
