import { Component, OnInit, Input } from '@angular/core';
import { ModeOfPayment } from '../cart/mode-of-payment.enum';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() customerId: any;
  employeeId: any;
  saved: boolean;
  placed: boolean;
  orderId: any;

  private ModeOfPayment = ModeOfPayment
  private ModeOfPaymentValues = Object.keys(ModeOfPayment)
  modeOfPayment: ModeOfPayment = ModeOfPayment.Cash

  saveOrderStatus: string = "On Hold";
  placeOrderStatus: string = "Complete";

  constructor(private orderService: OrderService) {
    this.employeeId = 1;
    this.saved = false;
    this.placed = false;
  }

  ngOnInit() {
  }

  saveOrder() {
    this.addOrder(this.saveOrderStatus);
    this.saved = true;
  }
  placeOrder() {
    this.addOrder(this.placeOrderStatus);
    this.placed = true;
  }

  addOrder(status) {
    console.log("status: " + status + " modeOfPayment: " + this.modeOfPayment + " customerId " + this.customerId + " employeeId:" + this.employeeId)
    this.orderService.addOrder(status, this.modeOfPayment, this.customerId, this.employeeId).subscribe(data => {
      console.log("data: " + data.id);
      this.orderId = data.id;
    });
  }

}
