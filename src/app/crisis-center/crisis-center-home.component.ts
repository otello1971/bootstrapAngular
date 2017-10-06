import { Component } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';

@Component({
  template: `
  <div class="row w-100 p-2">

    <div class="col" [hidden]="!espere">
      <div class="card">
        <div class="card-body">
            espere ...
        </div>
      </div>
    </div>

    <ng-container *ngIf="!espere">
      <div class="col">
        <div class="card">
          <div class="card-body text-center">
            Welcome to the Crisis Center
          </div>
        </div>
      </div>
    </ng-container>

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
          this.espere =  true; }
      });
    }
 }
