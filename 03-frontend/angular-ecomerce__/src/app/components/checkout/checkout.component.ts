import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import{Luv2ShopFormService} from 'src/app/services/luv2-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup ;
  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardYears:number[]=[];
  creditCardMonths: number[]=[];
  startMonth:number
  countries: Country[];
  shippingAddresStates:  State[];
  billingAdddressStates: State[];




  constructor(private formBuilder:FormBuilder,private cartService:CartService,private checkOutService:Luv2ShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup= this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2)]), /*for validation methods*/ 
        lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
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
    // get credit card months

    this.startMonth = new Date().getMonth()+1;
    
    this.checkOutService.getCreditCardMonths(this.startMonth).subscribe(

      data=>{
        console.log("this is the monthes"+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    // get credit card years
    this.checkOutService.getCreditCardYears().subscribe(
      data=>{
      console.log("this is the years"+JSON.stringify(data));
      this.creditCardYears=data;
    }
    );

    //get countries
    this.checkOutService.getCountries().subscribe(
      data=>{
        console.log("the countries have returned");
        this.countries=data;
      }
    );

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
   
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
  }
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
    this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAdddressStates=this.shippingAddresStates;
  }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAdddressStates=[];
    }

  }

  handleMonthsAndYears(){
      const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
      const currentYear:number= new Date().getFullYear();
      const selectedYear:number= Number(creditCardFormGroup.value.expirationYear);
      if(selectedYear === currentYear)
        {
          this.startMonth=new Date().getMonth() + 1;
        }
        else{
          this.startMonth=1;
        }
        console.log("start month"+this.startMonth);
        this.checkOutService.getCreditCardMonths(this.startMonth).subscribe(
          data=>{
            this.creditCardMonths=data;
          }
        );
  }

  getStates(formGroupName:string){
    const formGroup= this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup.get('country').value.code;
    const countryName= formGroup.get('country').value.name;
    
    console.log(`${formGroupName} country code ${countryCode}`);
    console.log(`${formGroupName} country name ${countryName}`);

    this.checkOutService.getStates(countryCode).subscribe(
      data=>{
        console.log('this data of state'+JSON.stringify(data));
        if(formGroupName==='shippingAddress')
            this.shippingAddresStates=data;
          else
            this.billingAdddressStates=data;

            formGroup.get('state').setValue(data[0]);
      }
    );
  }
  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}   
}
