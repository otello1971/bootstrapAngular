import { Component } from '@angular/core';

@Component({
  template:  `
    <div class="row py-2">
      <div class="col" align="center">
        <h2>Crisis Center</h2>
      </div>
    </div>
    <router-outlet></router-outlet>
  `
})
export class CrisisCenterComponent { }
