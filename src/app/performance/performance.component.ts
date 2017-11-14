import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Performance } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styles: []
})
export class PerformanceComponent implements OnInit {
  gymJournalDocId$: Observable<string>;
  @Input()
  workoutId: string;
  @Input()
  exerciseId: string;

  performances$: Observable<Performance[]>;

  constructor(private service: WorkoutService) { }

  ngOnInit() {
    this.gymJournalDocId$ = this.service.gymJournalDoc$.map(x => x.id);
    this.performances$  = this.gymJournalDocId$.switchMap( gymJournalId =>
        this.service.findPerformanceCollection(gymJournalId, this.workoutId, this.exerciseId));
  }

}
