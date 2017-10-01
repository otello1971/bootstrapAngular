import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app';
  searchPattern: Observable<string>;

  ngOnInit() {
    // $('[data-toggle="popover"]').popover(); // for Bootstrap4 Popover
  }

  onKey(value: string) {
    this.searchPattern = Observable.of(value);
  }

}
