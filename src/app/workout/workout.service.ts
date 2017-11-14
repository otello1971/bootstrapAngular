
import { Injectable } from '@angular/core';

// Restangular
import { Restangular } from 'ngx-restangular';

// Firebase
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/find';

import {Performance, Exercise, Workout, GymJournal } from '../../environments/interfaces';


@Injectable()
export class WorkoutService {

  private _gymJournalDoc$: BehaviorSubject<GymJournal> = new BehaviorSubject<GymJournal | null>(null);
  gymJournalDoc$: Observable<GymJournal> = this._gymJournalDoc$.asObservable();

  // private _workoutCollection$: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[] | null>(null);
  // workoutCollection$: Observable<Workout[]> = this._workoutCollection$.asObservable();

  // exerciseCollection$: Observable<Exercise[]>;
  // performanceCollection$: Observable<Performance[]>;

  constructor(private restangular: Restangular,
              private db: AngularFirestore) { }

  // /////////////////////////////////////////////////////////////////////////
  //  !!!! OJO !!!! Restangular DB --- Importante codificación --- No Borrar!
  // /////////////////////////////////////////////////////////////////////////
  // getWorkouts(): Observable<Workout[]> {
  //   return this.restangular.all('workout').getList();
  // }
  // getWorkout(id: number | string): Observable<Workout> {
  //   return  this.restangular.one('workout', id).get();
  // }
  // getLastWorkout(): Observable<Workout[]> {
  //   return this.restangular.all('workout').getList(
  //     {
  //       _sort: 'date',
  //       _order: 'desc',
  //       _start: 0,
  //       _end: 1
  //     });
  // }
  // workout?_sort=date&_order=desc&_start=0&_end=1
  // searchWorkouts(searchPattern: string): Observable<Workout[]> {
  //   return this.restangular.all('workout').getList({date_like: searchPattern});
  // }


  findGymJournalDoc(userid: string): Observable<GymJournal> {
    console.log('gymJournalDoc (userid) : ' + userid);
    return this.db.collection<GymJournal>('GymJournal', ref => ref.where('userid', '==', userid))
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as GymJournal;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
      .first()
      .map( data => data[0])
      .do(x => this._gymJournalDoc$.next(x));
  }

  findWorkoutCollection(gymJournalDoc: string): Observable<Workout[]> {
      console.log('gymJournalDoc: ' + gymJournalDoc);
      return this.db.collection('GymJournal')
        .doc(gymJournalDoc)
        .collection<Workout>('workouts')
        .snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Workout;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
  }

  findExerciseCollection(gymJournalDoc: string, workoutDoc: string): Observable<Exercise[]> {
    console.log('gymJournalDoc: ' + gymJournalDoc + ', workoutDoc: ' + workoutDoc);
    return this.db.collection('GymJournal')
      .doc(gymJournalDoc)
      .collection<Workout>('workouts')
      .doc(workoutDoc)
      .collection<Exercise>('exercises')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Exercise;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  findPerformanceCollection(gymJournalDoc: string, workoutDoc: string, exerciseDoc: string): Observable<Performance[]> {
    console.log('gymJournalDoc: ' + gymJournalDoc + ', workoutDoc: ' + workoutDoc + ', exerciseDoc: ' + exerciseDoc);
    return this.db.collection('GymJournal')
      .doc(gymJournalDoc)
      .collection<Workout>('workouts')
      .doc(workoutDoc)
      .collection<Exercise>('exercises')
      .doc(exerciseDoc)
      .collection<Performance>('performances')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Performance;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  findWorkoutDoc(gymJournalDoc: string, workoutDoc: string): Observable<Workout> {
    return this.db.collection('GymJournal')
      .doc(gymJournalDoc)
      .collection<Workout>('workouts')
      .doc(workoutDoc)
      .valueChanges()
      .first()
      .map( data => data[0]);
  }

  //   exercises$.subscribe(x => console.log('Exercises:' + JSON.stringify(x)));
  //   // exercises$.subscribe(x => console.log('Exercises:' + JSON.stringify(x)));

  //   return Observable.combineLatest(workout$, exercises$)
  //     .map( data => {
  //       let workout1: Workout = data[0];
  //       let exercises1: Exercise[] = data[1];
  //       return { workout1, exercises: exercises1 };
  //     });

  // }




}
