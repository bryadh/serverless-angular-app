import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products = [];
  filteredProducts = [];

  constructor(private productService: ProductService) { 
    this.subscription = productService.getAll().subscribe(res => {
      this.filteredProducts = this.products = Object.keys(res).map(key => ({ key, value: res[key]}));
    })
  }

  ngOnInit(): void {
  }


  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.value.model.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
