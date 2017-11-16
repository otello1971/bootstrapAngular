import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// **************  Angular Material   *****************
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
// ****************************************************

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutService } from './workout.service';

import { WorkoutComponent } from './workout.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { PerformanceComponent, DialogPerformanceDialog } from '../performance/performance.component';
import { GymJournalComponent } from '../gym-journal/gym-journal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    GymJournalComponent,
    WorkoutComponent,
    ExerciseComponent,
    PerformanceComponent,
    DialogPerformanceDialog],
  bootstrap: [
    PerformanceComponent,
    DialogPerformanceDialog],
  providers: [
    WorkoutService,
  ]
})
export class WorkoutModule { }
