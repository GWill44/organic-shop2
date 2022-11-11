import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
      });
  }

}
