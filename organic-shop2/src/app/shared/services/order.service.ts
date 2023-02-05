import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ShoppingCartService} from "./shopping-cart.service";
import {EMPTY, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) { }

  async placeOrder(order: Order){
    let result = await this.db.list('/orders').push(order);
    await this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges();
  }

  getUserOrders() {
    return this.authService.user$
      .pipe(
        switchMap((user) => {
          return user ?
            this.db.list('/orders',
                ref => ref.orderByChild('userId').equalTo(user.uid)).valueChanges() :
            EMPTY;
        })
      )
  }

}
