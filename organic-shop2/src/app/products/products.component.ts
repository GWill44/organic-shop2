import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Observable} from "rxjs";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$: Observable<any> | undefined;
  category: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => this.products = products);
    this.categories$ = this.categoryService.getAll();

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.payload.val().category === this.category) :
        this.products;
    })
    console.log(this.filteredProducts);
  }

}
