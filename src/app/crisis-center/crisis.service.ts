
import { Injectable } from '@angular/core';
import { Crisis } from './Crisis';
// import { RestangularModule, Restangular } from 'ngx-restangular';
import { Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class CrisisService {

  constructor(private restangular: Restangular) { }

  getCrises(): Observable<Crisis[]> {
    return this.restangular.all('crisis').getList();
  }

  getCrisis(id: number | string): Observable<Crisis> {
    return  this.restangular.one('crisis', id).get();
  }

  searchCrisis(searchPattern: string): Observable<Crisis[]> {
    return this.restangular.all('crisis').getList({name_like: searchPattern }); // {name_like: '^M'}
  }

}
