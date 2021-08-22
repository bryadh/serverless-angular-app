import { Injectable } from '@angular/core';

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
}
