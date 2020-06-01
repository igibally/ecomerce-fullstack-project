import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../common/Product';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getCategoryName(): string {
    return this.categoryName;
  }
  private categoryName:string;
  private baseUrl='http://192.168.99.100:8080/api/products';
  constructor(private httpClient:HttpClient) {}

  setCategoryName(categoryName:string){
    this.categoryName=categoryName;
  }


  getProductList(categoryId:number):Observable<Product[]>{

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }


  getProductListPaginate(categoryId:number,thePage:number,size:number):Observable<GetResponseProduct>{

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`+
    `&page=${thePage}`+`&size=${size}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }


  getProductCategories():Observable<ProductCategory[]> {
    const categoryUrl='http://192.168.99.100:8080/api/product-category';
    return this.httpClient.get<GetResponseProductCategory>(categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  searchProducts(searchKeyWord: string):Observable<Product[]>{
     const seachProductsUrl=`${this.baseUrl}/search/findByNameContaining?name=${searchKeyWord}`;
      return this.getProducts(seachProductsUrl);
    }

    searchProductsPaginate(searchKeyWord:string,thePage:number,size:number):Observable<GetResponseProduct>{

      const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${searchKeyWord}`
      +`&page=${thePage}&size=${size}`;
      return this.httpClient.get<GetResponseProduct>(searchUrl);
    }

    getProduct(productId: number):Observable<Product> {
       const productDetailsUrl=`${this.baseUrl}/${productId}`;
       return this.httpClient.get<Product>(productDetailsUrl);
    }



    private getProducts(seachProductsUrl: string) {
    return this.httpClient.get<GetResponseProduct>(seachProductsUrl).pipe(map(response => response._embedded.products));
  }
}



interface GetResponseProduct {

   _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory {

  _embedded:{
   productCategory:ProductCategory[];
 }
}
