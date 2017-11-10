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
  @Input()
  workoutId: string;
  @Input()
  gymJournalId: string;
  @Input()
  exerciseId: string;

  performances$: Observable<Performance[]>;

  constructor(private service: WorkoutService) { }

  ngOnInit() {
    this.performances$ = this.service.findPerformanceCollection(this.gymJournalId, this.workoutId, this.exerciseId);
  }

}
