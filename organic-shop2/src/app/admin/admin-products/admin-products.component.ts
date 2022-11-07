import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[] | undefined;
  filteredProducts: any[] | undefined;
  productsSubscription!: Subscription;

  constructor(
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productsSubscription =
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products!.filter((p: any) => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

}
