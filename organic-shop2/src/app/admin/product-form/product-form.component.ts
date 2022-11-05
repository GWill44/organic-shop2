import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('',[Validators.required])
    // imageUrl validator removed until functioning pattern. Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  })

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {

  }

  save(product: Object){
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }

  get title(){ return this.form.get('title'); }
  get price(){ return this.form.get('price'); }
  get category(){ return this.form.get('category'); }
  get imageUrl(){ return this.form.get('imageUrl'); }
}
