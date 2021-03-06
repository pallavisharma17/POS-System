import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/customer.service';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { CashDrawerComponent } from './cash-drawer/cash-drawer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: ':customerId/products',
    component: CartComponent
  },
  {
    path: 'orders/:order_type',
    component: OrderComponent
  },
  {
    path: 'reload/:orderId',
    component: CartComponent
  },
  {
    path: 'cashDrawer',
    component: CashDrawerComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    ProductComponent,
    OrderComponent,
    CartComponent,
    PaymentComponent,
    LoginComponent,
    CashDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CustomerService, CartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
