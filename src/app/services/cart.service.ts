import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CART_URL = "http://localhost:8080/api/carts"
  private CUSTOMER_URL = "http://localhost:8080/api/customers"

  subtotal: any;

  constructor(private http: HttpClient) { }


  getCart(customerId) {
    return this.http.get(this.CUSTOMER_URL + '/' + customerId + '/cart');
  }

  addProductToCart(customerId, productId): Observable<any> {
    let body = {
      id: productId
    }
    return this.http.post(this.CART_URL + '/add/' + customerId, body, httpOptions);
  }

  decreaseQuantity(customerId, productId): Observable<any> {
    let body = {
      id: productId
    }
    return this.http.post(this.CART_URL + '/decrease/' + customerId, body, httpOptions);
  }

  deleteProduct(customerId, productId): Observable<any> {
    return this.http.delete(this.CART_URL + '/delete/' + customerId + '/' + productId, httpOptions);
  }

  deleteCart(customerId): Observable<any> {
    return this.http.delete(this.CART_URL + '/delete/' + customerId, httpOptions);
  }

  calculateSubtotal(carts): Observable<any> {
    this.subtotal = 0.0;
    for (let cartDetails of carts) {
      this.subtotal = this.subtotal + (cartDetails.product.price * cartDetails.quantity);
    }
    return this.subtotal;
  }

}
