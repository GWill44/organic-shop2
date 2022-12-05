import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any | null> | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders$ = this.orderService.getUserOrders();
    this.orders$.subscribe(x => console.log('hit',x))
  }

}
