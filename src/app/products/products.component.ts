import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  brand: string;
  shoppingCart;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    shoppingCartService: ShoppingCartService
    ) { 
      
      shoppingCartService.getCart()
        .subscribe(res => {
          this.shoppingCart = res;
        })

      // get all the products
      productService.getAll()
        .subscribe(res => {
          this.products = Object.keys(res).map(key => ({ key, value: res[key]}));

          route.queryParamMap.subscribe(res => {
            this.brand = res.get('brand');
    
            this.filteredProducts = (this.brand) ? 
              this.products.filter(p => p.value.brand === this.brand) :
              this.products
          });
        });
   }

  ngOnInit(): void {
    
  }

}
