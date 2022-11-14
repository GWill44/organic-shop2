import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, tap} from "rxjs";
import {Product} from "./models/product";
import {ProductMapperService} from "./product-mapper.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase,
    private productMapper: ProductMapperService) { }

  create(product: Object) {
     this.db.list('/products').push(product);
  }
  getAll() : Observable<Product[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(dbProducts => this.productMapper.mapDbToProducts(dbProducts)));
  }
  get(productId: string) : Observable<any>{
    return this.db.object('/products/' + productId).valueChanges();
  }
  update(productId: string, product: Object){
    void this.db.object('/products/' + productId).update(product);
  }
  delete(productId: string){
    void this.db.object('/products/' + productId).remove();
  }
}
