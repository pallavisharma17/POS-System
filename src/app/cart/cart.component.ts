import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import Promise from "ts-promise";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() customerId: any;
  @Input() carts: any;
  ngOnChanges(changes) {
    this.getCart()
  }
  @Output() res = new EventEmitter<any>();
  @Input() checkout: boolean;
  @Output() resCheck = new EventEmitter<any>();

  reloadState: string;
  subtotal: any;
  tax = 0.00;
  grandTotal = 0.0;
  customer: any
  orderId: any;

  constructor(private route: ActivatedRoute, private cartService: CartService,
    private customerService: CustomerService) {
    this.reloadState = '';
    this.route.params.subscribe(res => {
      this.orderId = res.orderId;
      if (this.orderId) {
        this.reloadCart();
      }
    })
  }

  ngOnInit() {
    if (!this.reloadState) {
      console.log('in cart')
      console.log(this.customerId);
      Promise.resolve(this.getCustomer())
        .then(() => {
          this.getCart()
        })
        .then(() => {
          console.log("init se hua ye calc");
          this.calculateBill()
        })
    }
  }

  initialSetup() {
    console.log('in cart')
    console.log(this.customerId);
    Promise.resolve(this.getCustomer())
      .then(() => {
        this.getCart()
      })
      .then(() => {
        console.log("init se hua ye calc");
        this.calculateBill()
      })
  }

  getCustomer() {
    this.customer = this.customerService.getCustomer(this.customerId).subscribe(data => {
      this.customer = data;
    })
  }

  getCart() {
    Promise.resolve(this.cartService.getCart(this.customerId).subscribe(data => {
      this.carts = data;
    }))
      .then(() => {
        this.res.emit(this.carts)
      })
      .then(() => {
        console.log("calc");
        this.calculateBill()
      })
  }

  increaseQuantity(productId) {
    Promise.resolve(this.cartService.addProductToCart(this.customerId, productId).subscribe(data => {
      console.log("add hui quantity " + data);
      this.getCart()
    }))
      .then(() => {
        this.calculateBill();
        console.log("ye increase se hua h")
      })
  }

  decreaseQuantity(productId) {
    Promise.resolve(this.cartService.decreaseQuantity(this.customerId, productId).subscribe(data => {
      console.log(data);
    })).then(() => {
      this.getCart();
      console.log("decrease pe to ni aaya bhai")
    })
      .then(() => {
        this.calculateBill();
        console.log("ho gya oye decrease pe")
      })
  }

  calculateBill() {
    Promise.resolve(this.cartService.calculateSubtotal(this.carts))
      .then((subtotal) => {
        this.subtotal = subtotal;
        if (this.subtotal > 0)
          this.tax = 10
        this.grandTotal = this.subtotal + this.tax
      })
  }

  deleteProduct(productId) {
    Promise.resolve(this.cartService.deleteProduct(this.customerId, productId).subscribe(data => {
      console.log("deleted " + data);
    }))
      .then(() => {
        this.getCart();
        console.log("delete product pe to ni aaya bhai")
      })
      .then(() => {
        this.calculateBill();
        console.log("ho gya oye delete product pe")
      })
  }

  deleteCart() {
    this.subtotal = 0.0;
    Promise.resolve(this.cartService.deleteCart(this.customerId).subscribe(data => {
      console.log("deleted " + data);
    }))
      .then(() => {
        this.subtotal = 0.0;
        console.log("ho gya oye delete cart pe")
      })
      .then(() => {
        this.getCart();
      })
  }

  toggleCheckout() {
    this.checkout = true;
    this.resCheck.emit(this.checkout);
    if (this.reloadState == "checkCart") {
      this.reloadState = "confirmOrder";
    }
  }

  reloadCart() {
    console.log(this.orderId);
    Promise.resolve(this.cartService.reloadCart(this.orderId).subscribe(data => {
      this.carts = data;
      this.customerId = this.carts[0].cart.customer.id;
      this.getCustomer();
      this.reloadState = "checkCart";
    }))
      .then(() => {
        this.res.emit(this.carts)
      })
      .then(() => {
        console.log("reload calc");
        this.calculateBill()
      })

  }

}
