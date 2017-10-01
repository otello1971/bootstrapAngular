// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './Hero';

@Component({
  templateUrl: './hero-list.component.html'
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private selectedId: number;

  private searchPattern: string;  // live search pattern feature

  constructor(
    private service: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.heroes$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return (this.searchPattern == null ?
          this.service.getHeroes() :
          this.service.searchHeroes(this.searchPattern));
      });
  }
}
