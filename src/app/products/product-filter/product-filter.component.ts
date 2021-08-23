import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/brand.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  brands = [];
  @Input('brand') brand;

  constructor(brandService: BrandService) {
    // get all the brands
    brandService.getBrands()
    .take(1)
    .subscribe(res => {
      this.brands = Object.keys(res).map(key => ({ key, value: res[key]}));
  });
   }

  ngOnInit(): void {
  }

}
