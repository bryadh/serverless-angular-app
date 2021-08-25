import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) { 
      
      auth.appUser$.subscribe(res => this.appUser = res);

      // get shopping cart
      shoppingCartService.getCart().subscribe(res => {
        this.shoppingCartItemCount = res.totalItemsCount
      })
  }

  logout() {
   this.auth.logout();
  }
}
