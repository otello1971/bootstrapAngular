import { Component } from '@angular/core';

@Component({
  template:  `
  <div class="card text-center">
  <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
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
  </div>
  <div class="card-body">
    <router-outlet></router-outlet>
  </div>
</div>
  `
})
export class AdminComponent {
}
