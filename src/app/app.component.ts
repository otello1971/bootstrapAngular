import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    $('[data-toggle="popover"]').popover(); 
  }

}
