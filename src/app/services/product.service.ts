import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_URL = "http://localhost:8080/api/products"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.PRODUCT_URL);
  }

  getSearchProducts(search): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '/search/?searchParam=' + search);
  }
}
