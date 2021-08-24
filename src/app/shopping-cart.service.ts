import { Injectable } from '@angular/core';

// FIREBASE
import firebase from "firebase/app";
import "firebase/database";
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  private getCart(cartId) {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('shopping-carts/' + cartId).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
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
      this.create().subscribe(res => {
        result = Object.keys(res).map(key => ({ key, value: res[key]}));
      })
      localStorage.setItem('cartId', result.key);
      return result.key;
    } 
    return cartId;
  }

  /**
   * Calls the pushToCart function method to get an observable
   * @param product Product
   * @returns Observable
   */
  addToCart(product: Product){
    let cartId = this.getOrCreateCartId();
    return this.pushToCart(cartId, product);
  }

  /**
   * Adds a product to the shopping cart.
   * Increments the quantity if the product is already inside the shopping cart
   * @param cartId 
   * @param product 
   * @returns Observable
   */
  pushToCart(cartId, product: Product) {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('/shopping-carts/' + cartId + '/items/' + product.key).get().then((snapshot) => {
        if (snapshot.exists()) {
          // incrementing quantity in the cart for the same product
          firebase.database().ref('/shopping-carts/' + cartId + '/items/' + product.key).update({
            quantity: snapshot.val().quantity + 1
          });
        } else {
          // adding the product in the cart for the first time
          firebase.database().ref('/shopping-carts/' + cartId + '/items/' + product.key).set({
            product: product,
            quantity: 1
          })
        }
        observer.next(snapshot.val())
      });
    });
    return obs$;
  }
}
