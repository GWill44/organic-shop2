import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<any> | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }

}
