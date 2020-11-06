import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';


export interface IResponse {
    statusCode : string;
    type : string;
    data : Product[];
    message : string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  

  apiUrl:string = "http://localhost:8000/api/v1/greenday";

  constructor(private http : HttpClient) { 
  }

   editProduct(product: Product){
    let getProductsUrl = `${this.apiUrl}/${product.id}`;
    return this.http.put(getProductsUrl, product )
  }

  getProducts(): Observable<Product[]> {  
    let getProductsUrl = `${this.apiUrl}`;
    return this.http.get<IResponse>(getProductsUrl)
      .pipe(map(response => {return response.data}))
  }  
   
  addProduct(product: Product): Observable<string> {  
    let getProductsUrl = `${this.apiUrl}`;
    return this.http.post<string>(getProductsUrl, product, this.httpOptions);  
  }  
  updateProduct(product: Product): Observable<string> {  
    let getProductsUrl = `${this.apiUrl}/${product.id}`;
    return this.http.put<string>(getProductsUrl, product, this.httpOptions);  
  }  

  deleteProduct(productId: string): Observable<string> {  
    let getProductsUrl = this.apiUrl + '/' + productId;
    return this.http.delete<string>(getProductsUrl, this.httpOptions);
  }

  private defaultErrorHandler() {
    return (error: any) => Observable.throw(error.json().error || 'Server error');
  }
}