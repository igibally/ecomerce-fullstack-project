import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/Product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails:Product = new Product();
  constructor(private productService:ProductService, private route:ActivatedRoute,private cartService:CartService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
        this.getProductDetails();
    });
  }
  getProductDetails(){
   const productId:number = +this.route.snapshot.paramMap.get("id");

   console.log("id:"+productId);
     this.productService.getProduct(productId).subscribe(
       data=>{
         console.log(data);
         this.productDetails=data;
       }
     );
}

addToCart(){
  console.log(`adding to cart : ${this.getProductDetails.name},${this.productDetails.unitPrice}`);
 let cartItem:CartItem = new CartItem(this.productDetails);
 this.cartService.addToCart(cartItem);

}

}
