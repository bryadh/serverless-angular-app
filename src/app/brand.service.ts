import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";
import "firebase/database";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private fireStore: AngularFirestore) {}

  getBrands() {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('Brands').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    })
    return obs$;
  }
}
