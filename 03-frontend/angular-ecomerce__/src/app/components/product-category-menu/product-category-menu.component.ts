import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  constructor(private productService:ProductService) {}

   productCategories: ProductCategory[];

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
     data=> {
       this.productCategories=data;
     }
    );
  }
  sendCategoryName(event:any)
  {
    const input = event.target as HTMLElement;
    this.productService.setCategoryName(input.innerText);
    console.log(this.productService.getCategoryName());

  }
}

