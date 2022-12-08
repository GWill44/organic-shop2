import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductMapperService {

  constructor() { }

  mapDbToProducts(dbProducts: any[]): Product[] {
    let products: Product[] = [];
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

  mapFormToProduct(productForm: FormGroup): Product {
    return {
      title: productForm.controls?.['title'].value,
      price: productForm.controls?.['price'].value,
      category: productForm.controls?.['category'].value,
      imageUrl: productForm.controls?.['imageUrl'].value,
      key: undefined
    };
  }
}
