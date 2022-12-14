import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Product} from "../models/product";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {ShoppingCart} from "../models/shopping-cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((dbShoppingCart: any) => new ShoppingCart(dbShoppingCart.items)));
  }
  addToCart(product: Product) {
    void this.updateItem(product, 1);
  }
  removeFromCart(product: Product) {
    void this.updateItem(product, -1);
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    await this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key!);
    item$.valueChanges().pipe(
      take(1)).subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;
        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
          quantity: quantity
        });
    });
  }
}
