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

  getBrands() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('brands').orderByChild('name').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }
}
