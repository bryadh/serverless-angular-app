import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

// FIREBASE
import firebase from "firebase/app";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() {}
  
  /**
   * Gets a list of brands from firebase and wrapping them inside an obseravable.
   * the observable will emit the list
   * @returns Observable
   */
  getBrands() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('brands').orderByChild('name').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }
}
