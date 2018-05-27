import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customerId: any;
  carts: any;
  checkout: boolean;
  products: any;

  constructor() { }

  ngOnInit() {
    this.checkout = false;
  }

  updateCustId(custId) {
    this.customerId = custId
  }

  updateCart(carts) {
    this.carts = carts;
  }

  updateCheckout(checkout) {
    this.checkout = checkout;
  }

  updateProducts(products) {
    this.products = products;
  }

}
