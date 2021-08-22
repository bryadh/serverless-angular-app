import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/brand.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  isLoading: boolean = true;
  id;
  brands = [];
  product:any = {};

  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
    ) {
    brandService.getBrands()
    .take(1)
    .subscribe(res => {
      this.brands = Object.keys(res).map(key => ({ key, value: res[key]}));
      this.isLoading = false;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id)
      .take(1)
      .subscribe(p => {
        console.log('THE PRODUCT => ', p);
        this.product = p;
      })
    }
  }

  ngOnInit(): void {
  }

  save(formProduct) {
    if (this.id) {
      this.productService.update(this.id, formProduct);
    } else {
      this.productService.create(formProduct);
    }
    this.router.navigate(['/admin/products']);
  }

}
