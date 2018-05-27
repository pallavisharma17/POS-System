import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private ORDER_URL = "http://localhost:8080/api/orders"

  constructor(private http: HttpClient) { }

  addOrder(status: string, modeOfPayment, customerId, employeeId): Observable<any> {
    let order = {
      status: status,
      modeOfPayment: modeOfPayment
    }
    console.log("in service")
    return this.http.post(this.ORDER_URL + '/add/' + customerId + '/' + employeeId, order, httpOptions);
  }

  getEmployeeSavedOrders(employeeId): Observable<any> {
    return this.http.get(this.ORDER_URL + '/saved/' + employeeId);
  }

  getEmployeePlacedOrders(employeeId): Observable<any> {
    return this.http.get(this.ORDER_URL + '/placed/' + employeeId);
  }

  getOrderDetails(orderId): Observable<any> {
    return this.http.get(this.ORDER_URL + '/order/' + orderId);
  }

}
