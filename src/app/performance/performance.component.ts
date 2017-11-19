import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Performance } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer } from '@angular/forms';
// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSliderChange } from '@angular/material';


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
    let dialogRef = this.dialog.open(PerformanceDialog, {
      width: '250px',
      data: !!perf ? JSON.parse(JSON.stringify(perf)) : {'weight': '0', 'reps': '1'} // deep copy
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
  styleUrls: ['performance.dialog.css'],
})
// tslint:disable-next-line:component-class-suffix
export class PerformanceDialog {
  performanceForm: FormGroup;
  reps_min = 1;
  reps_max = 100;
  min = 0;
  max = 100;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PerformanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Performance

  ) {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.performanceForm = this.fb.group({
      'weight': new FormControl(this.data.weight),
      'reps': new FormControl(this.data.reps),
      'times': new FormControl(this.data.times, [
        Validators.min(0),
        Validators.max(99),
        Validators.pattern('[0-9]+')
      ])
    });
  }

 onChange(e: MatSliderChange) {
  if (e.value === this.min && e.value > this.reps_min) {
    this.min--;
  } else {
  this.min = Math.floor(this.data.reps / 2) > this.reps_min ?
                          Math.floor(this.data.reps / 2) : this.reps_min;
  }
  if (e.value === this.max && e.value < this.reps_max) {
    this.max++;
  } else {
  this.max = Math.floor(this.data.reps * 1.5) <= this.reps_max ?
                          Math.floor(this.data.reps * 1.5) : this.reps_max;
  }
 }

  get weight() { return this.performanceForm.get('weight'); }
  get reps() { return this.performanceForm.get('reps'); }
  get times() { return this.performanceForm.get('times'); }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

