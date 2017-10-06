import { Component } from '@angular/core';
declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  template:  `
  <div class="card text-center mt-0">
    <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" routerLink="./"
              id="home-tab"
              data-toggle="tab"
              data-taget="#home"
              role="tab"
              aria-controls="home"
              aria-expanded="true">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" routerLink="./crises"
              id="crisis-tab"
              data-toggle="tab"
              data-taget="#home"
              role="tab"
              aria-controls="home">Manage Crises</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" routerLink="./heroes"
              id="heroes-tab"
              data-toggle="tab"
              data-taget="#home"
              role="tab"
              aria-controls="home">Manage Heroes</a>
            </li>
          </ul>
    </div>
    <div class="card-body">
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
</div>
  `
})



export class AdminComponent {}

