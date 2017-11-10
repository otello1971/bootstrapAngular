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

  @Input()
  workoutId: string;
  @Input()
  gymJournalId: string;

  exercises$: Observable<Exercise[]>;

  constructor(private service: WorkoutService) { }

  ngOnInit() {
    this.exercises$ = this.service.findExerciseCollection(this.gymJournalId, this.workoutId);

  }

}
