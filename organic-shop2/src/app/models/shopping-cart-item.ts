export class ShoppingCartItem {
  key: string = '';
  title: string = '';
  imageUrl: string = '';
  category: string = '';
  price: number = 0;
  quantity: number = 0;

  get totalPrice() { return this.price * this.quantity }
}
