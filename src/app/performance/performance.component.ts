import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Performance } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer } from '@angular/forms';
// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styles: []
})
export class PerformanceComponent implements OnInit {
  @Input()
  gymJournalId: string;
  @Input()
  workoutId: string;
  @Input()
  exerciseId: string;
  performances$: Observable<Performance[]>;

  constructor(private service: WorkoutService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.performances$ =
      this.service.findPerformanceCollection(this.gymJournalId, this.workoutId, this.exerciseId);
  }

  openDialog(perf: Performance): void {
    let dialogRef = this.dialog.open(DialogPerformanceDialog, {
      width: '250px',
      data: !!perf ? JSON.parse(JSON.stringify(perf)) : {'weight': '0', 'reps': '0'} // deep copy
    });

    dialogRef.afterClosed().subscribe((result: Performance) => {
      if (result) {
        this.service.setPerformanceDoc(
          this.gymJournalId,
          this.workoutId,
          this.exerciseId,
          result.id,
          result);
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  templateUrl: 'performance.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogPerformanceDialog {
  performanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogPerformanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Performance

  ) {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.performanceForm = this.fb.group({
      'weight': new FormControl(this.data.weight, [
        Validators.required,
        Validators.min(0),
        Validators.max(999),
        Validators.pattern('[0-9]+(\.[0-9])?')
      ]),
      'reps': new FormControl(this.data.reps, [
        Validators.required,
        Validators.min(0),
        Validators.max(99),
        Validators.pattern('[0-9]+')
      ]),
      'times': new FormControl(this.data.times, [
        Validators.min(0),
        Validators.max(99),
        Validators.pattern('[0-9]+')
      ])
    });
  }

  get weight() { return this.performanceForm.get('weight'); }
  get reps() { return this.performanceForm.get('reps'); }
  get times() { return this.performanceForm.get('times'); }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

