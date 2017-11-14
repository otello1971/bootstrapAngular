import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';

declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  searchString = new FormControl(''); // search string is empty

  constructor(private router: Router,
              private authService: AuthService
  ) {}

  ngOnInit() {
        // Esperar mientras se carga...
        this.router.events.subscribe((e: Event) => {
          if (e instanceof NavigationStart) {
            $('#navbarSupportedContent').collapse('hide');
          }});
  }

  // Observable string streams
  // searchPattern$ = this.inputSearchPattern.asObservable(); // for live searching
  // searchPattern$: Observable<string>;
  // searchPattern = ''; // static

  // onKey(value: string) {
  //   this.searchPattern = this.name.value; // stores last input value
  //   this.inputSearchPattern.next(value); // emmitter
  // }

}
