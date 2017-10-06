import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  authUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      (user: firebase.User|null) => this.authUser = user,
      (error: any) => this.redirectUrl = '/login'
    );
  }

  login(): Promise <firebase.auth.UserCredential> {
    return (this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
