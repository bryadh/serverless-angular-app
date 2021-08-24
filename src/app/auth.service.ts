import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

// FIREBASE
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
    ) {
    this.user$ = afAuth.authState;
  }

  /**
   * Login with google
   */
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  /**
   * Logout
   */
  logout() {
    this.afAuth.signOut();
  }

  /**
   * Returns an Observable of the current logged user
   */
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid)

        return of(null);
      })

  }

}
