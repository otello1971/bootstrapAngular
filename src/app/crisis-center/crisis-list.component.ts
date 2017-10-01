// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CrisisService } from './crisis.service';
import { Crisis } from './Crisis';

@Component({
  templateUrl: './crisis-list.component.html'
})
export class CrisisListComponent implements OnInit {
  listCrisis$: Observable<Crisis[]>;
  private selectedId: number;

  private searchPattern: string;  // live search pattern feature

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.listCrisis$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return (this.searchPattern == null ?
          this.service.getListCrisis() :
          this.service.searchCrisis(this.searchPattern));
      });
  }
}
