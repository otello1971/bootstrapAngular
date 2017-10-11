import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutService } from './workout.service';

@NgModule({
  imports: [
    CommonModule,
    WorkoutRoutingModule
  ],
  declarations: [WorkoutComponent],
  providers: [
    WorkoutService
  ]
})
export class WorkoutModule { }
