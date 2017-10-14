import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from '../app.component';
import { WorkoutService } from './workout.service';
import { Workout } from '../../environments/interfaces';

@Component({
  templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  latestWorkout$: Observable<Workout>;

  // private selectedId: number;
  // private patron: string;

  constructor(
    private service: WorkoutService,
    private route: ActivatedRoute,
    private appcomp: AppComponent
  ) {}

  ngOnInit() {
    // Para la primera vez, se carga una lista 'estática' de workouts
    // this.workouts$ = this.service.searchWorkouts(this.appcomp.searchString.value);

    this.workouts$ = this.service.getLatestWorkout2();

    // this.latestWorkout$.subscribe((w: Workout[]) => console.log('Workout:' + JSON.stringify(w[0])));


    // Suscribirse a cambios en la url de llamada, del router, solo para desplegar workout seleccionado
    // this.route.paramMap.subscribe((params: ParamMap) => this.selectedId = +params.get('id'));

    // Suscribirse a cambios en el filtro de workout desde el 'search' de app.component
    // this.appcomp.searchString.valueChanges
    //   .subscribe(p => this.workouts$ = this.service.searchWorkouts(p),
    //              errorResponse => {
    //                 console.log('Workout.component.td: Error!');
    //   });
  }
}
