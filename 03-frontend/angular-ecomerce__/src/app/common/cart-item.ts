import { Product } from './Product';

export class CartItem {
  id:string;
  name:string;
  imageUrl:string;
  unitprice:number;
  quanitiy:number;

  constructor(product:Product){

    this.id =product.id;
    this.name= product.name;
    this.imageUrl=product.imageUrl;
    this.unitprice=product.unitPrice;
    this.quanitiy=1;
  }
}
