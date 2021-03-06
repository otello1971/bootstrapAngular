import { Component } from '@angular/core';
import { Router, NavigationExtras,
         ActivatedRoute, RouterState, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

// Firebase
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  template: `
    <h2>LOGIN</h2>
    <div *ngIf="authService.afAuth.authState | async; let user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
    `
})

export class LoginComponent {
   message: string;
   parentURL: string;

  constructor(public authService: AuthService,
              public router: Router) {

    this.setMessage();
  }

   setMessage() {
     this.message = 'Logged ' + (this.authService.authUser ? 'in' : 'out');
   }

  login() {
    this.message = 'Trying to log in ...';
    this.setMessage();
    let _this = this;

    // Se debe esperar hasta que el login retorne un resultado
    this.authService.login().then ((result) => {
          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };
          // Redirect the user
          let redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/login';
          _this.authService.redirectUrl = null;  // limpia la url de llegada
          _this.router.navigate([redirect], navigationExtras);
      }, (error) => {
          _this.router.navigate(['/login']);
      });

  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
