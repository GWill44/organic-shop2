import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CategoryService} from "../../category.service";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<any> | null | undefined;
  @Input('category') category: string | null | undefined;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
