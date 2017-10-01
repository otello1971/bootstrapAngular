// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from '../app.component';
import { HeroService } from './hero.service';
import { Hero } from './Hero';

@Component({
  templateUrl: './hero-list.component.html'
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private selectedId: number;
  private patron: string;

  searchPattern$: Observable<string>;  // for live searching

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private appcomp: AppComponent
  ) {}

  ngOnInit() {
    this.heroes$ = this.service.searchHeroes(this.appcomp.searchPattern);

    this.appcomp.searchPattern$
      .subscribe(p => this.heroes$ = this.service.searchHeroes(p),
      errorResponse => {
        console.log('hero-list.component.td: Error!');
    });

    // this.heroes$ = this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return (this.service.getHeroes());
    //   });
  }

}
