import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";
import {Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {


  products: any[] | undefined;
  filteredProducts: any[] | undefined;
  productsSub!: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      dom: 'lrt'
    };
    this.productsSub =
      this.productService.getAll().subscribe(products => {
        this.products = products;
        this.dtTrigger.next(this.filteredProducts = products);
    });
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products!.filter((p: any) => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
