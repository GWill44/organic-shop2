import { Injectable } from '@angular/core';
import {Product} from "./models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductMapperService {

  constructor() { }

  mapToProducts(dbProducts: any[]): Product[] {
    let products: Product[] = [];
    debugger;
    for(let i = 0; i < dbProducts.length; i++) {
      let currentProduct = dbProducts[i].payload.val();
      let product: Product = {
        title: currentProduct.title,
        price: currentProduct.price,
        category: currentProduct.category,
        imageUrl: currentProduct.imageUrl,
        key: dbProducts[i].key
      };
      products.push(product);
    }
    return products;
  }
}
