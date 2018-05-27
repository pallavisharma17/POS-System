import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CashDrawerService } from '../services/cash-drawer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  employee: any;
  startBalance: any;

  constructor(private loginService: LoginService, private cashDrawerService: CashDrawerService) {
    this.username = '';
    this.password = '';
    this.startBalance = 0.0;
  }

  ngOnInit() {
  }

  login() {
    this.loginService.getEmployee(this.username, this.password).subscribe(data => {
      this.employee = data;
    })
    console.log(this.employee);
    this.loginService.setEmployeeId(this.employee.id);
    console.log("id: "+this.employee.id)
  }

  startBal() {
    this.cashDrawerService.createCashDrawer(this.startBalance, this.employee.id).subscribe(data => { })
  }

}
