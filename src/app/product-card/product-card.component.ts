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
  
  constructor(private shoppingCartServie: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    console.log('CALL TO addToCart');
    this.shoppingCartServie.addToCart(product).subscribe(res => {
      console.log('RESULT IN COMPONENT => ' , res);
    })
  }

}
