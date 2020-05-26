import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup ;
  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private formBuilder:FormBuilder,private cartService:CartService) { }

  ngOnInit(): void {

    this.checkoutFormGroup= this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.checkoutFormGroup=this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.checkoutFormGroup=this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.checkoutFormGroup=this.formBuilder.group({
        cardType:[''],
        nameOneCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      }),
    });

    this.getOrderDetailsStatus();
    this.cartService.computeCartTotal();
  }
  getOrderDetailsStatus() {
    this.cartService.totalPrice.subscribe(data=> this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
  }

  getOrderDetails() {

  }

  onSubmit(){
    console.log("Handling  the submit button");
    console.log(this.checkoutFormGroup.get("customer").value);
    console.log("the email value in the checkout Form Group"+this.checkoutFormGroup.get("customer").value.email);
  }
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
    this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }

  }
}
