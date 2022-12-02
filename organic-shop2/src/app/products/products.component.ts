import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/product";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null | undefined;
  cart: ShoppingCart | undefined;
  shoppingCartSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.shoppingCartSub = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);

    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  ngOnDestroy() {
    this.shoppingCartSub?.unsubscribe();
  }

}
