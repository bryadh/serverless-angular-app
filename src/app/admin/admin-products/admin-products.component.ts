import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from 'src/app/product.service'
import { Product } from '../../models/product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products : Product[];
  filteredProducts = [];

  constructor(private productService: ProductService) {

    // get all the products from ProductService
    this.subscription = productService.getAll().subscribe(res => {
      this.filteredProducts = this.products = Object.keys(res).map(key => ({ key, value: res[key]}));
    })
  }

  ngOnInit(): void {
  }

  /**
   * Applies string filter in the search bar.
   * Template will display filteredProducts if a filter is applied;
   * @param query string
   */
  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.value.model.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
