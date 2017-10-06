import { Injectable } from '@angular/core';
import {
        CanActivate, Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        CanActivateChild,
        NavigationExtras,
        CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';

// Firebase
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor( private authService: AuthService,
               private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // otro tema: regla de tslint para configurar exigencia de constantes : prefer-const en tslint.json

    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
     if ( this.authService.authUser ) {
          return true;
      } else {
          this.authService.redirectUrl = url; // almacena la url de llamada.
          this.router.navigate(['/login']);
          return false;
      }
  }
}

