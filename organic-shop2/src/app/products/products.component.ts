import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Observable} from "rxjs";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<any> | undefined;
  categories$: Observable<any> | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.categories$ = this.categoryService.getAll();
  }

}
