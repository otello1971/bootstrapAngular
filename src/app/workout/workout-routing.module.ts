import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';

import { GymJournalComponent } from '../gym-journal/gym-journal.component';

const workoutRoutes: Routes = [
  { path: 'workout',
    component: GymJournalComponent
    // , canLoad: [AuthGuard]
   },
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
