import {Component} from '@angular/core';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product$: Observable<Product>;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('',[Validators.required])
    // imageUrl validator removed until functioning pattern. Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = this.categoryService.getCategories();

    this.product$ = productService.get(this.getID()).pipe(
      tap((product: Product) => {
        this.form.controls.title.setValue(product.title);
        this.form.controls.price.setValue(product.price);
        this.form.controls.category.setValue(product.category);
        this.form.controls.imageUrl.setValue(product.imageUrl);
      }));
  }

  save(product: Object){
    (this.getID() != '') ?
      this.productService.update(this.getID(), product) :
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(!confirm("Are you sure you wish to delete this product?")) return;
    this.productService.delete(this.getID());
    this.router.navigate(['/admin/products']);
  }

  getID() {
    let id = this.route.snapshot.paramMap.get('id');
    return (id ? id : '');
  }

  get title(){ return this.form.get('title'); }
  get price(){ return this.form.get('price'); }
  get category(){ return this.form.get('category'); }
  get imageUrl(){ return this.form.get('imageUrl'); }
}
