import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[];

  constructor(productService: ProductService) {
    productService.getAll().subscribe(res => {
      this.products = Object.keys(res).map(key => ({ key, value: res[key]}));
    })
   }

  ngOnInit(): void {
    
  }

}
