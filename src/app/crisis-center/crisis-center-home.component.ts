import { Component } from '@angular/core';
import { Router, NavigationStart
                //  , NavigationEnd
                 , Event } from '@angular/router';

@Component({
  template: `
<div [hidden]="!espere" class="card">
  <div class="card-body">
      espere ...
  </div>
</div>
  <div *ngIf="!espere" class="card">
    <div class="card-body text-center">
      Welcome to the Crisis Center
    </div>
  </div>
  `
})
export class CrisisCenterHomeComponent {
  espere = false;
  constructor(
    private router: Router) {
      // Esperar mientras se carga...
      this.router.events.subscribe((e: Event) => {
        if (e instanceof NavigationStart) {
          this.espere =  true; } // else
        // if (e instanceof NavigationEnd) {
        //   this.espere = false; }
      });
    }
 }
