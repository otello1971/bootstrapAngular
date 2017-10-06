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

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private appcomp: AppComponent
  ) {}

  ngOnInit() {
    // Para la primera vez, se carga una lista 'estática' de héroes desde app.component
    this.heroes$ = this.service.searchHeroes(this.appcomp.searchString.value);

    // Suscribirse a cambios en la url de llamada, del router, solo para desplegar héroe seleccionado
    this.route.paramMap.subscribe((params: ParamMap) => this.selectedId = +params.get('id'));

    // Suscribirse a cambios en el filtro de heroes desde el 'search' de app.component
    this.appcomp.searchString.valueChanges
      .subscribe(p => this.heroes$ = this.service.searchHeroes(p),
                 errorResponse => {
                    console.log('hero-list.component.td: Error!');
      });


  }

}
