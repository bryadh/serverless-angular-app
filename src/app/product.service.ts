import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// FIREBASE
import firebase from "firebase/app";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  /**
   * Pushs a new product to firebase realtime database
   * @param product 
   * @returns 
   */
  create(product) {
    return firebase.database().ref('products/').push(product);
  }

  /**
   * Gets a list of all the products and wrapping them inside an observable.
   * The Observable will emit the list
   * @returns Observable
   */
  getAll() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('products').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }

  /**
   * Gets a product by id and wrapping it inside an observable.
   * The observable will emit the value of the product
   * @param productId 
   * @returns Observable
   */
  get(productId) {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('products/' + productId).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }

  /**
   * Updates a product
   * @param productId 
   * @param product 
   * @returns 
   */
  update(productId, product) {
    return firebase.database().ref('/products/' + productId).set(product);
  }

  /**
   * Deletes a product
   * @param productId 
   * @returns 
   */
  delete(productId) {
    return firebase.database().ref('/products/' + productId).remove();
  }
  
}
