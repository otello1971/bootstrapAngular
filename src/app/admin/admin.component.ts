import { Component } from '@angular/core';

@Component({
  template:  `
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-2">
    <span class="h1" class="navbar-brand mb-0">Admin:</span>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link" routerLink="./" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="./crises" routerLinkActive="active">Manage Crises</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="./heroes" routerLinkActive="active">Manage Heroes</a>
      </li>
    </ul>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class AdminComponent {
}
