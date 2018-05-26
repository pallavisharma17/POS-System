import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any[];
  @Input() customerId: any;
  @Input() carts: any;
  @Output() res = new EventEmitter<any>();
  search: string;

  constructor(private productService: ProductService,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.getProducts();
    this.search = '';
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  getSearchProducts() {
    this.productService.getSearchProducts(this.search).subscribe(data => {
      this.products = data;
    })
  }

  getCart() {
    this.cartService.getCart(this.customerId).subscribe(newData => {
      this.carts = newData;
      this.res.emit(this.carts);
    });
  }

  addProductToCart(productId) {
    console.log(productId + " " + this.customerId);
    this.cartService.addProductToCart(this.customerId, productId).subscribe(data => {
      console.log(data);
      this.getCart();
    });
  }

}
