import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CashDrawerService {

  private CASHDRAWER_URL = "http://localhost:8080/api/cash/drawer"

  constructor(private http: HttpClient) { }

  createCashDrawer(startBalance, employeeId): Observable<any> {
    let employee = {
      id: employeeId
    }
    return this.http.post(this.CASHDRAWER_URL + '/add/' + startBalance, employee, httpOptions);
  }

  getCashDrawers(employeeId): Observable<any> {
    return this.http.get(this.CASHDRAWER_URL + '/' + employeeId);
  }
}
