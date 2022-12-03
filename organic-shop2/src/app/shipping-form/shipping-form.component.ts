import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {Shipping} from "../models/shipping";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {OrderService} from "../order.service";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart | undefined;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required])
  });

  userId: string | undefined;
  authSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId!, new Shipping(this.form), this.cart!);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

  get name(){ return this.form.get('name'); }
  get addressLine1(){ return this.form.get('addressLine1'); }
  get addressLine2(){ return this.form.get('addressLine2'); }
  get city(){ return this.form.get('city'); }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
