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

  create(product) {
    return firebase.database().ref('products/').push(product);
  }

  getAll() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('products').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }

  get(productId) {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('products/' + productId).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }

  update(productId, product) {
    return firebase.database().ref('/products/' + productId).set(product);
  }

  delete(productId) {
    return firebase.database().ref('/products/' + productId).remove();
  }
  
}
