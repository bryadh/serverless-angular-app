import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product)
      .take(1)
      .subscribe();
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product)
      .take(1)
      .subscribe();
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }

}
