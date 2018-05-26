import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private CUSTOMER_URL = "http://localhost:8080/api/customers"
  constructor(private http: HttpClient) { }

  getCustomers(search): Observable<any> {
    return this.http.get(this.CUSTOMER_URL + '/search/?searchParam=' + search);
  }

  getCustomer(customerId): Observable<any> {
    return this.http.get(this.CUSTOMER_URL + '/' + customerId);
  }

  // Updated parse data method handles arrays and objects
  private parseData(res: Response) {
    let body = res.json();

    if (body instanceof Array) {
      return body || [];
    }
    else return body.post || {};
  }
}
