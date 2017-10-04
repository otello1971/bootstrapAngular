import { Component, OnInit } from '@angular/core';
declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  template:  `
  <div class="card text-center mt-0">
    <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" routerLink="./" routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              role="tab" >Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" routerLink="./crises" routerLinkActive="active"
              role="tab" >Manage Crises</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" routerLink="./heroes" routerLinkActive="active"
              role="tab" >Manage Heroes</a>
            </li>
          </ul>
    </div>
    <div class="card-body">
      <router-outlet></router-outlet>
    </div>
</div>
  `
})
export class AdminComponent implements OnInit {
  ngOnInit() {
    $('#myTab a:first').tab('show'); // Select first tab
  }
}
