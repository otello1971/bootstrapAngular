
import { Injectable } from '@angular/core';
// import { Workout } from './Workout';
// import { Exercise } from '../exercise/exercise';
// import { Performance } from '../performance/performance';

// Restangular
import { Restangular } from 'ngx-restangular';

// Firebase
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/find';

import {PerformanceLessId, Performance, ExerciseLessId,  Exercise, WorkoutLessId, Workout } from '../../environments/interfaces';

@Injectable()
export class WorkoutService {



  constructor(private restangular: Restangular,
              private db: AngularFirestore) { }



  getWorkouts(): Observable<Workout[]> {
    return this.restangular.all('workout').getList();
  }

  getWorkout(id: number | string): Observable<Workout> {
    return  this.restangular.one('workout', id).get();
  }

  getLastWorkout(): Observable<Workout[]> {
    return this.restangular.all('workout').getList(
      {
        _sort: 'date',
        _order: 'desc',
        _start: 0,
        _end: 1
      });
  }

  getLatestWorkout(): Observable<any> {
    // let workoutsCollection: AngularFirestoreCollection<Workout>;
    let workoutDoc: AngularFirestoreDocument<Workout>;

    let exerciseCollection: AngularFirestoreCollection<Exercise>;
    let exerciseDoc: AngularFirestoreDocument<any>;

    let performanceCollection: AngularFirestoreCollection<Performance>;

    let workout$: Observable<Workout>;
    let exercise$: Observable<Exercise>;
    let exercises$: Observable<Exercise[]>;
    let performances$: Observable<Performance[]>;

    // let compound$: Observable<any>;

    workoutDoc = this.db.doc<Workout>('GymJournal/Ivk44JnIqU5DijOXN5Kg/workouts/ZU4CKsObsdaxjMH781OB');
    workout$ = workoutDoc             // .valueChanges();
    .snapshotChanges().map(a => {
        const data = a.payload.data() as Workout;
        const id = a.payload.id;
        return { id: id, ...data };
      });
    // workout$.subscribe(x => console.log('Workout:' + JSON.stringify(x)));

    exerciseCollection = workoutDoc.collection<Exercise>('exercises');
    exercises$ = exerciseCollection   // .valueChanges();
      .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id1 = a.payload.doc.id;
        return { id: id1, ...data };
      });
    });

    exercises$.map((e: Exercise[]) => {
      // tslint:disable-next-line:forin

        e.map((ee: Exercise) => {
          exerciseDoc = exerciseCollection.doc(ee.id);
          exercise$ = exerciseDoc
          .snapshotChanges().map(a => {
            const data = a.payload.data() as Exercise;
            const id = a.payload.id;
            return { id: id, ...data };
            });

          performanceCollection = exerciseDoc.collection<Performance>('performances');
          performances$ = performanceCollection
          .snapshotChanges().map(actions2 => {
            return actions2.map(a2 => {
              const data2 = a2.payload.doc.data() as Performance;
              const id2 = a2.payload.doc.id;
              return { id: id2, ...data2 };
            });
          });

          return Observable.combineLatest(exercise$, performances$)
          .map( data => {
            let exercise1: Exercise = data[0];
            let performances1: Performance[] = data[1];
            return { exercise1, performances: performances1 };
          });
      });
    });

    exercises$.subscribe(x => console.log('Exercises:' + JSON.stringify(x)));

    return Observable.combineLatest(workout$, exercises$)
      .map( data => {
        let workout1: Workout = data[0];
        let exercises1: Exercise[] = data[1];
        return { workout1, exercises: exercises1 };
      });

  }

  // workout?_sort=date&_order=desc&_start=0&_end=1
  searchWorkouts(searchPattern: string): Observable<Workout[]> {
    return this.restangular.all('workout').getList({date_like: searchPattern});
  }

}
