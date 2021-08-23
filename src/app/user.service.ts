import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

// FIREBASE
import firebase from 'firebase/app';
import 'firebase/database';
import * as firebaseTools from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: AppUser;

  constructor(private db: AngularFirestore) { }

  save(user: firebaseTools.default.User) {
    firebase.database().ref('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    let obs$ = new Observable((observer) => {
      firebase.database().ref('users/' + uid).on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
    return obs$;
  }

}
