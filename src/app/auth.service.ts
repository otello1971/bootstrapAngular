import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observer } from 'rxjs/Observer';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()

export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  authUserSubject$: BehaviorSubject<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.authUserSubject$ = new BehaviorSubject<firebase.User | null>(null);
    afAuth.auth.onAuthStateChanged(this.authUserSubject$);
  }

  login(): Promise <firebase.auth.UserCredential> {
    return (this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.authUserSubject$
      .map(user => !!user);
  }
}
