import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  constructor(private cartService:CartService) { }

  cartItems:CartItem[]= [];
  totalPrice:number=0;
  totalQuantity:number=0;
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get handle to all cart items
    this.cartItems= this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
    this.cartService.computeCartTotal();
  }

  incrementQuantity(cartItem:CartItem){

    console.log(cartItem.id);
    this.cartService.addToCart(cartItem);
  }
  decrementQuantity(cartItem:CartItem){
    this.cartService.decrementQuantity(cartItem);

  }
  removeItem(cartItem:CartItem){
    this.cartService.remove(cartItem);

  }

}
