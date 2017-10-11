import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutComponent } from './workout.component';

const workoutRoutes: Routes = [
  { path: 'workout',  component: WorkoutComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(workoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkoutRoutingModule { }
