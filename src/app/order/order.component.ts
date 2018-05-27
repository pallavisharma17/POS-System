import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

class ShowOrder {
  orderId: any = 0;
  total: any = 0.0;
  customerName: string;
  time: string;
  status: string;
};

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  employeeId: any;
  orderType: any;
  showOrders: any[];
  total: any;
  order: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.employeeId = 1;
    this.route.params.subscribe(res => {
      this.orderType = res.order_type;
    })
    this.showOrders = [];
    if (this.orderType == "saved") {
      this.getEmployeeSavedOrders(this.employeeId);
    } else if (this.orderType == "placed") {
      this.getEmployeePlacedOrders(this.employeeId);
    }
  }

  ngOnInit() {
  }

  getEmployeeSavedOrders(employeeId) {
    this.orderService.getEmployeeSavedOrders(employeeId).subscribe(data => {
      this.orders = data;
      console.log(data);
      this.showData();
    })
  }
  getEmployeePlacedOrders(employeeId) {
    this.orderService.getEmployeePlacedOrders(employeeId).subscribe(data => {
      this.orders = data;
      console.log(data);
      this.showData();
    })
  }

  showData() {

    for (let i = 0; i < this.orders.length;) {

      let showOrder: ShowOrder = new ShowOrder();

      showOrder.orderId = this.orders[i].order.id;
      showOrder.customerName = this.orders[i].order.customer.name;
      showOrder.status = this.orders[i].order.status;
      showOrder.time = this.orders[i].order.createdDate;

      this.total = 0.0;

      do {
        this.total += this.orders[i].price;
        i++;
      } while (i < this.orders.length && this.orders[i].order.id == this.orders[i - 1].order.id);

      showOrder.total = this.total;
      this.showOrders.push(showOrder);
    }
    console.log("show " + this.showOrders);
  }

  openPlacedOrder(order) {
    console.log(order.orderId + " " + order.total);
    this.orderService.getOrderDetails(order.orderId).subscribe(data => {
      this.order = data;
      console.log(data);
    })
  }
}
