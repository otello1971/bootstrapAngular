import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app';

  // Observable string sources
   private inputSearchPattern = new Subject<string>();

  // Observable string streams
  searchPattern$ = this.inputSearchPattern.asObservable(); // for live searching
  searchPattern = ''; // static

  ngOnInit() {
    // $('[data-toggle="popover"]').popover(); // for Bootstrap4 Popover
    this.inputSearchPattern.next('');
  }

  onKey(value: string) {
    this.searchPattern = value;  // stores last input value
    this.inputSearchPattern.next(value); // emmitter
  }

}
