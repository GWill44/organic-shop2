import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Shipping} from "../models/shipping";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart | undefined;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required])
  });
  cartSubscription: Subscription | undefined;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: new Shipping(this.form),
      items: this.cart?.mapCheckOutItems()
    }
    this.orderService.storeOrder(order);
  }

  get name(){ return this.form.get('name'); }
  get addressLine1(){ return this.form.get('addressLine1'); }
  get addressLine2(){ return this.form.get('addressLine2'); }
  get city(){ return this.form.get('city'); }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }
}
