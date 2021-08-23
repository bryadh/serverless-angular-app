import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  brands = [];
  brand: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    brandService: BrandService) { 
      // get all the brands
      brandService.getBrands()
        .take(1)
        .subscribe(res => {
          this.brands = Object.keys(res).map(key => ({ key, value: res[key]}));
      });
      // get all the products
      productService.getAll().subscribe(res => {
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
