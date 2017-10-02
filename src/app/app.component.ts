import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';

declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  searchString = new FormControl(''); // search string is empty

  // Observable string streams
  // searchPattern$ = this.inputSearchPattern.asObservable(); // for live searching
  // searchPattern$: Observable<string>;
  // searchPattern = ''; // static

  // onKey(value: string) {
  //   this.searchPattern = this.name.value; // stores last input value
  //   this.inputSearchPattern.next(value); // emmitter
  // }

}
