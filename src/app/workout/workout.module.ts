import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutService } from './workout.service';

import { WorkoutComponent } from './workout.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { PerformanceComponent } from '../performance/performance.component';
import { GymJournalComponent } from '../gym-journal/gym-journal.component';


@NgModule({
  imports: [
    CommonModule,
    WorkoutRoutingModule
  ],
  declarations: [
    GymJournalComponent,
    WorkoutComponent,
    ExerciseComponent,
    PerformanceComponent],
  providers: [
    WorkoutService,
  ]
})
export class WorkoutModule { }
