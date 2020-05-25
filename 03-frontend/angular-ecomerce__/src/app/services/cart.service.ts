import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];
  totalPrice:Subject<number>= new Subject<number>();
  totalQuantity:Subject<number>= new Subject<number>();
  constructor()
  {
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')) != null ? JSON.parse(sessionStorage.getItem('cartItems')):[];
   }
addToCart(cartItem:CartItem){
console.log(cartItem.id);

  let alreadyCartItem:boolean=false;
  let existingCartItem:CartItem=undefined
  if(this.cartItems.length>0){
    existingCartItem= this.cartItems.find(item=> item.id===cartItem.id);
  }
alreadyCartItem = (existingCartItem!=undefined);
if(alreadyCartItem==true){
  existingCartItem.quanitiy++;
}
else{
	this.cartItems.push(cartItem);
 }
this.computeCartTotal();


}
  computeCartTotal() {
    let  totalPrice:number= 0;
    let totalQuantity:number=0;
    for(let cartItem of this.cartItems){
      console.log(cartItem.name);
      this.logCartItemData(cartItem);
      totalPrice+= cartItem.quanitiy*cartItem.unitprice;
      totalQuantity+=cartItem.quanitiy;

    }
 // publish the event again to all subescribers
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
    this.logCartItemData(totalPrice,totalQuantity);
    this.persistCartItems();
  }


  public logCartItemData(cartItem: CartItem);
  public logCartItemData(totalPrice: number,totalQuantity:number);

  logCartItemData(paramOne: number | CartItem,paramTwo?:number){
       if(paramOne instanceof  CartItem){
        console.log(`name:${paramOne.name},quantity:${paramOne.quanitiy},unitPrice:${paramOne.unitprice}`);
       }
       else{
         console.log(`subTotalPrice:${paramOne}`);
       }
       if(typeof paramTwo != 'undefined'){
        console.log(`TotalQuantity:${paramTwo}`);
       }
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quanitiy--;
    if(cartItem.quanitiy === 0){
      this.remove(cartItem);
    }
    else{
    this.computeCartTotal();
    }

  }
  remove(cartItem: CartItem) {
    const itemIndex= this.cartItems.findIndex(tempItem=> cartItem.id == tempItem.id);
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
    }
    this.computeCartTotal();
  }

  persistCartItems(){
    console.log('the carts items here' +JSON.stringify(this.cartItems));
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }



}
