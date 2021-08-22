import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/brand.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  isLoading: boolean = true;
  
  brands = [];
  constructor(brandService: BrandService) {
    brandService.getBrands().subscribe(res => {
      console.log('RES => ', res);
      this.brands = Object.keys(res).map(key => ({ key, value: res[key]}));
      this.isLoading = false;
      console.log('BRANDS => ', this.brands);
    });
  }

  ngOnInit(): void {
  }
}
