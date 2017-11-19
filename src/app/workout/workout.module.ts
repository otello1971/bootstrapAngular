import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// **************  Angular Material   *****************
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
// ****************************************************

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutService } from './workout.service';

import { WorkoutComponent } from './workout.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { PerformanceComponent, PerformanceDialog } from '../performance/performance.component';
import { GymJournalComponent } from '../gym-journal/gym-journal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule
  ],
  declarations: [
    GymJournalComponent,
    WorkoutComponent,
    ExerciseComponent,
    PerformanceComponent,
    PerformanceDialog],
  bootstrap: [
    PerformanceComponent,
    PerformanceDialog],
  providers: [
    WorkoutService,
  ]
})
export class WorkoutModule { }
