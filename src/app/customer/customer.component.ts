import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CartComponent } from '../cart/cart.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: any[];
  search: string;
  @Input() customerId: any;
  @Output() res = new EventEmitter<any>();

  constructor(private customerService: CustomerService) {
    this.search = '';
  }

  ngOnInit() { }

  getCustomers() {
    this.customerService.getCustomers(this.search).subscribe(data => {
      this.customers = data;
    })
  }

  setCustomerId(customerId) {
    this.customerId = customerId;
    this.res.emit(this.customerId)
  }

}
