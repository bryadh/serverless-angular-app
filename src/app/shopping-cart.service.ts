import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';

// FIREBASE
import firebase from "firebase/app";
import "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  /**
   * Gets a shopping cart and wrapps it inside an observable.
   * The observable will emit the value of the cart
   * @returns Observable
   */
  getCart() : Observable<ShoppingCart>{
    let cartId = this.getOrCreateCartId();
    let obs$ = new Observable<ShoppingCart>((observer) => {
      firebase.database().ref('shopping-carts/' + cartId).on('value', (snapshot) => {
        observer.next(new ShoppingCart(snapshot.val().items));
      });
    })
    return obs$;
  }
  
  /**
   * Calls the changeItemQuantity function method to get an observable
   * @param product Product
   * @returns Observable
   */
  addToCart(product: Product){
    return this.changeItemQuantity(product, 1);
  }

  /**
   * Calls the changeItemQuantity function method to get an observable
   * @param product Product
   * @returns Observable
   */
  removeFromCart(product: Product) {
    return this.changeItemQuantity(product, -1);
  }

  /**
   * Creats a new shopping cart and wrapping it inside an observable.
   * The observable will emit the value of the created shopping cart
   * @returns Observable
   */
  private create() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('/shopping-carts').push({
        dateCreated: new Date().getTime()
      }).on('value', (snapshot) => {
        observer.next(snapshot.val())
      })
    })

    return obs$;
  }

  /**
   * Creats a shopping cart and stores it in the local storage.
   * @returns string
   */
  private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result;
      this.create()
        .subscribe(res => {
          result = Object.keys(res).map(key => ({ key, value: res[key]}));
        })
      localStorage.setItem('cartId', result.key);
      return result.key;
    } 
    return cartId;
  }

  /**
   * Gets shopping cart item from firebase
   * @param cartId 
   * @param productId 
   * @returns 
   */
  private getItem(cartId, productId) {
    return firebase.database().ref('/shopping-carts/' + cartId + '/items/' + productId);
  }

  /**
   * Adds or removes a product from the shopping cart.
   * @param cartId 
   * @param product 
   * @returns Observable
   */
  private changeItemQuantity(product: Product, change: number) {
    let cartId = this.getOrCreateCartId();
    let obs$ = new Observable((observer) => {
      this.getItem(cartId, product.key).get().then((snapshot) => {
        this.getItem(cartId, product.key).update({
          product: product,
          quantity: (snapshot.val() ? snapshot.val().quantity : 0) + change
        });
        observer.next(snapshot.val())
      });
    });
    return obs$;
  }


}
