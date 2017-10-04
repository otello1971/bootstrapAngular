import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import { slideInDownAnimation } from '../animations';
import { Crisis } from './crisis';
import { DialogService } from '../dialog.service';

@Component({
  template: `
  <div [hidden]="!espere" class="card">
    <div class="card-body">
        espere ...
    </div>
  </div>
  <div *ngIf="crisis && !espere">
    <h3>"{{ editName }}"</h3>
    <div>
      <label>Id: </label>{{ crisis.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  // animations: [ slideInDownAnimation ]
})
export class CrisisDetailComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  // crisis$: Observable<Crisis>;
  crisis: Crisis;
  editName: string;
  espere = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public dialogService: DialogService
  ) {}


  ngOnInit() {
     this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
      // Esperar mientras se carga...
      this.router.events.subscribe((e: Event) => {
        if (e instanceof NavigationStart) {
          this.espere =  true; } else
        if (e instanceof NavigationEnd) {
          this.espere = false; }});
  }

  cancel() {
    this.crisis = null;
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }


  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}

