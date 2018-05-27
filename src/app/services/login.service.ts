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
export class LoginService {

  private EMPLOYEE_URL = "http://localhost:8080/api/employees"
  private employeeId: any;

  constructor(private http: HttpClient) { }

  getEmployee(username: string, password: string): Observable<any> {
    return this.http.get(this.EMPLOYEE_URL + '/login/' + username + '/' + password);
  }

  setEmployeeId(employeeId) {
    this.employeeId = employeeId;
  }
  getEmployeeId() {
    return this.employeeId;
  }

}
