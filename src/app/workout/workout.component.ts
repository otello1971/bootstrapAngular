import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from '../app.component';
import { WorkoutService } from './workout.service';
import { Workout } from '../../environments/interfaces';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit {

  @Input()
  gymJournalId: string;
  workouts$: Observable<Workout[]>;

  constructor(
    private service: WorkoutService,
    private route: ActivatedRoute,
    private appcomp: AppComponent
  ) {}

  ngOnInit() {

    this.workouts$ =  this.service.findWorkoutCollection(this.gymJournalId);

  }
}
