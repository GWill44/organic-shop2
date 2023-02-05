import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {OrderAdmin} from "../../../shared/models/order-admin";
import {Order} from "../../../shared/models/order";


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  adminOrders: OrderAdmin[] = []

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      for(let order of orders){
        this.adminOrders.push( new OrderAdmin( order.key!, <Order>order.payload.val()))
      }
      console.log(this.adminOrders)
    })
  }

}
