import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  gymJournalDocId$: Observable<string>;
  workouts$: Observable<Workout[]>;

  constructor(
    private service: WorkoutService
  ) {}

  ngOnInit() {
    // this.gymJournalDocId$ = this.service.gymJournalDoc$.map(x => x.id);
    // this.workouts$ = this.gymJournalDocId$.switchMap( id => this.service.findWorkoutCollection(id));
    this.workouts$ = this.service.findWorkoutCollection(this.gymJournalId);
  }
}
