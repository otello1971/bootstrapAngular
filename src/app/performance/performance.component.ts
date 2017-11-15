import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Performance } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';
// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  animal: string;
  name: string;

  constructor(private service: WorkoutService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.gymJournalDocId$ = this.service.gymJournalDoc$.map(x => x.id);
    this.performances$  = this.gymJournalDocId$.switchMap( gymJournalId =>
        this.service.findPerformanceCollection(gymJournalId, this.workoutId, this.exerciseId));
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogPerformanceDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-performance-dialog',
  templateUrl: 'dialog-performance-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogPerformanceDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogPerformanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

