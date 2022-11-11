import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, Subscription} from "rxjs";
import {Product} from "./models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Object) {
     this.db.list('/products').push(product);
  }
  getAll() : Observable<any> {
    return this.db.list('/products').snapshotChanges();
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
