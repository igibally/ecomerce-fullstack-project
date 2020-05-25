import { Component, OnInit, OnChanges, DoCheck, AfterContentChecked } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterContentChecked {

  constructor(private productService:ProductService,private route:ActivatedRoute,private cartService:CartService) {

  }
    products:Product[]=[];
    currentCategoryId:number=1;
    previousCategoryId:number=1;
    currentCategoryName:string;
    thePageNumber:number=1;
    thePageSize:number=10;
    theTotalElements:number=0;
    previousKeyWord:string=null;
    searchKeyWord:string=null;


  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{this.listProducts();})
  }

  ngAfterContentChecked():void{
    if(this.productService.getCategoryName() == undefined)
    this.currentCategoryName='books';
    else{
      this.currentCategoryName=this.productService.getCategoryName();
    }
}

  listProducts(){
    return this.handleListProducts();
  }

  handleListProducts(){

    const isSearchMode:boolean= this.route.snapshot.paramMap.has("keyword");
    if(isSearchMode){
        this.handleSearchProduct();
    }

  else{
      const hasCategoryId:boolean= this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }
     else{
       this.currentCategoryId=1;
     }

    if(this.currentCategoryId!=this.previousCategoryId)
     {
       this.thePageNumber=1;
     }
     this.previousCategoryId=this.currentCategoryId;
     console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}, the pageSize=${this.thePageSize}, the total elements=${this.theTotalElements}`);

     this.productService.getProductListPaginate(this.currentCategoryId,this.thePageNumber-1,this.thePageSize).
     subscribe(this.processResult())
  }
}
processResult(){
return data=>{
  this.products= data._embedded.products
  this.thePageNumber= data.page.number+1;
  this.thePageSize=data.page.size;
  this.theTotalElements=data.page.totalElements;
}
}

handleSearchProduct(){
  this.searchKeyWord = this.route.snapshot.paramMap.get('keyword');
  if(this.previousKeyWord!=this.searchKeyWord){
    this.thePageNumber=1;
  }
this.previousKeyWord=this.searchKeyWord;
   this.productService.searchProductsPaginate(this.searchKeyWord,this.thePageNumber-1,this.thePageSize).subscribe(this.processResult());
}

updatePageSize(selectedSize:number){
  this.thePageSize=selectedSize;
  this.thePageNumber=1;
  this.listProducts();
}
addToCart(tempProduct:Product){
  const cartItem = new CartItem(tempProduct);
  this.cartService.addToCart(cartItem);

}
}
