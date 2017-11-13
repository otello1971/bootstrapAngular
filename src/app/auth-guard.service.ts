import { Injectable } from '@angular/core';
import {
        CanActivate, Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        CanActivateChild,
        NavigationExtras,
        CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

// Firebase
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor( private authService: AuthService,
               private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.authService.authUserSubject$
    .take(1)
    .map((authState) => !!authState)
    .do(authenticated => {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
      // Navigate to the login page with extras
      if (!authenticated) {this.router.navigate(['/login']); }
    })
    ;
  }

}

