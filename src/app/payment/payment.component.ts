import { Component, OnInit, Input } from '@angular/core';
import { ModeOfPayment } from '../cart/mode-of-payment.enum';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() customerId: any;

  private  ModeOfPayment  =  ModeOfPayment
  private  ModeOfPaymentValues  =  Object.keys(ModeOfPayment)
  modeOfPayment:  ModeOfPayment  =  ModeOfPayment.Cash

  constructor() {

  }

  ngOnInit() {
  }

}
