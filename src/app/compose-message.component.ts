import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from './animations';

declare var $: any; // JQuery compatibility for Bootstrap4
declare var jQuery: any; // JQuery compatibility for Bootstrap4

@Component({
  templateUrl: './compose-message.component.html',
  styles: [ ':host { position: relative; bottom: 10%; }' ],
  // animations: [ slideInDownAnimation ]
})
export class ComposeMessageComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  details: string;
  sending = false;

  constructor(private router: Router) {}

  ngOnInit() {
    $('#myModal').modal('toggle'); // for Bootstrap4 Modal
    $('#myInput').focus(); // for Bootstrap4 Modal
  }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    $('#myModal').modal('toggle'); // for Bootstrap4 Modal
    this.router.navigate([{ outlets: { popup: null }}]);
  }
}
