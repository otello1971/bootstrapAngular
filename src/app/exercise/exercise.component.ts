import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../environments/interfaces';
import { Observable } from 'rxjs/Observable';
import { WorkoutService } from '../workout/workout.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styles: []
})
export class ExerciseComponent implements OnInit {
  gymJournalDocId$: Observable<string>;

  @Input()
  workoutId: string;

  exercises$: Observable<Exercise[]>;

  constructor(private service: WorkoutService) { }

  ngOnInit() {
    this.gymJournalDocId$ = this.service.gymJournalDoc$.map(x => x.id);
    this.exercises$ = this.gymJournalDocId$.switchMap( gymJournalId =>
                         this.service.findExerciseCollection(gymJournalId, this.workoutId));

  }

}
