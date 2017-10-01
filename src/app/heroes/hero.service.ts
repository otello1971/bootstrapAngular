
import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {

  constructor(private restangular: Restangular) { }

  getHeroes(): Observable<Hero[]> {
    return this.restangular.all('heroes').getList();
  }

  getHero(id: number | string): Observable<Hero> {
    return  this.restangular.one('heroes', id).get();
  }

  searchHeroes(searchPattern: string): Observable<Hero[]> {
    return this.restangular.all('heroes').getList({name_like: searchPattern});
  }

}
