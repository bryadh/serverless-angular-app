import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/brand.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  isLoading: boolean = true;
  brands = [];

  constructor(
    brandService: BrandService,
    private productService: ProductService
    ) {
    brandService.getBrands().subscribe(res => {
      this.brands = Object.keys(res).map(key => ({ key, value: res[key]}));
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
  }

  save(product) {
    this.productService.create(product)
  }

}
