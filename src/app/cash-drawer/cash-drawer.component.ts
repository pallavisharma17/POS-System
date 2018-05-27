import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CashDrawerService } from '../services/cash-drawer.service';

@Component({
  selector: 'app-cash-drawer',
  templateUrl: './cash-drawer.component.html',
  styleUrls: ['./cash-drawer.component.scss']
})
export class CashDrawerComponent implements OnInit {

  cashDrawers: any = [];

  constructor(private loginService: LoginService, private cashDrawerService: CashDrawerService) { }
  employeeId: any;

  ngOnInit() {
    this.employeeId = this.loginService.getEmployeeId();
    this.getCashDrawer();
  }

  getCashDrawer() {
    this.cashDrawerService.getCashDrawers(this.employeeId).subscribe(data => {
      this.cashDrawers = data;
    })
  }

}
