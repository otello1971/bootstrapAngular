
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


  // getLatestWorkout2(): Observable<Workout[]> {
  //   // let workoutsCollection: AngularFirestoreCollection<Workout>;
  //   let workoutCollection: AngularFirestoreCollection<Workout>;
  //   let exerciseCollection: AngularFirestoreCollection<Exercise>;
  //   let performanceCollection: AngularFirestoreCollection<Performance>;

  //   let workouts$: Observable<Workout[]>;
  //   let exercises$: Observable<Exercise[]>;
  //   let performances$: Observable<Performance[]>;

  //   workoutCollection = this.db.doc('GymJournal/Ivk44JnIqU5DijOXN5Kg').collection<Workout>('workouts');
  //   workouts$ = workoutCollection.valueChanges()
  //   .map( wks => {
  //      wks.map(
  //     (wko: Workout) => {
  //       exerciseCollection = workoutCollection.doc(wko.id).collection<Exercise>('exercises');
  //       exercises$ = exerciseCollection.valueChanges().map( exs => {
  //         wko.exercises = exs.map(
  //         (exo: Exercise) => {
  //           performanceCollection = exerciseCollection.doc(exo.id).collection<Performance>('performances');
  //           performances$ = performanceCollection.valueChanges().map( pfs => {
  //              exo.performances = pfs.map(
  //             (pfo: Performance) => {
  //               return pfo;
  //             });
  //             return pfs;
  //           });
  //           return exo;
  //         });
  //         return exs;
  //       });
  //       return wko;
  //     });
  //   return wks;
  // });


  //   return workouts$;
  // }

  getLatestWorkout2(): Observable<Workout[]> {
    // let workoutsCollection: AngularFirestoreCollection<Workout>;
    let workoutCollection: AngularFirestoreCollection<Workout>;
    let exerciseCollection: AngularFirestoreCollection<Exercise>;
    let performanceCollection: AngularFirestoreCollection<Performance>;

    let workouts$: Observable<Workout[]>;
    let exercises$: Observable<Exercise[]>;
    let performances$: Observable<Performance[]>;

    workoutCollection = this.db.doc('GymJournal/Ivk44JnIqU5DijOXN5Kg').collection<Workout>('workouts');
    workouts$ = workoutCollection.valueChanges()
    .map( wks =>
       wks.map(
       (wko: Workout) => {
        exerciseCollection = workoutCollection.doc(wko.id).collection<Exercise>('exercises');
        exercises$ = exerciseCollection.valueChanges()
        .map( exs => {
          wko.exercises = exs
          .map(
           (exo: Exercise) => {
            performanceCollection = exerciseCollection.doc(exo.id).collection<Performance>('performances');
            performances$ = performanceCollection.valueChanges()
            .map( pfs => {
               exo.performances = pfs
               .map(
                (pfo: Performance) => {
                 return pfo;
              });
              return pfs;
            });
            return exo;
          });
          return exs;
        });
        return wko;
      })
  );


    return workouts$;
  }


  getLatestWorkout(): Observable<any> {
    // let workoutsCollection: AngularFirestoreCollection<Workout>;
    let workoutDoc: AngularFirestoreDocument<Workout>;

    let exerciseCollection: AngularFirestoreCollection<Exercise>;
    let exerciseDoc: AngularFirestoreDocument<any>;

    let performanceCollection: AngularFirestoreCollection<Performance>;

    let workout$: Observable<Workout>;
    let exercise$: Observable<Exercise>;
    let exercises$: Observable<any[]>;
    let performances$: Observable<Performance[]>;

    workoutDoc = this.db.doc<Workout>('GymJournal/Ivk44JnIqU5DijOXN5Kg/workouts/ZU4CKsObsdaxjMH781OB');
    exerciseCollection = workoutDoc.collection<Exercise>('exercises');

    workout$ = workoutDoc             // .valueChanges();
    .snapshotChanges().map(a => {
        const data = a.payload.data() as Workout;
        const id = a.payload.id;
        return { id: id, ...data};
      });

     exercises$ = exerciseCollection.snapshotChanges().map(
        actionExercises => {
          return actionExercises.map(actionExercise => {
            const id1 = actionExercise.payload.doc.id;
            const data1 = actionExercise.payload.doc.data() as Exercise;
            return { id: id1, ...data1 };
          });
        });

    // exerciseCollection.snapshotChanges().do(
    //     actionExercises => {
    //       actionExercises.forEach(actionExercise => {
    //         const id1 = actionExercise.payload.doc.id;
    //         let doc_e = exerciseCollection.doc(id1);
    //         let data;

    //         doc_e
    //         .snapshotChanges()
    //                 .mergeMap(exerciseAction => {
    //                   const exerciseId = exerciseAction.payload.id;
    //                   const exerciseData = exerciseAction.payload.data() as Exercise;

    //                   performanceCollection = exerciseCollection.doc(exerciseId).collection<Performance>('/performances');
    //                   return performanceCollection
    //                       .snapshotChanges()
    //                         .map( actions2 => {
    //                           let performances1: Performance[] = actions2
    //                             .map(per => {
    //                               const id2 = per.payload.doc.id;
    //                               const data2 = per.payload.doc.data() as Performance;
    //                               return { id: id2, ...data2 };
    //                             });
    //                           data = { id: exerciseId, ...exerciseData, performances: performances1};
    //                           return data;
    //                       });
    //           });
    //           doc_e.update(data);
    //       });
    // });



    //         exercise$ = exerciseCollection.doc(lista[0])
    //         .snapshotChanges()
    //                 .mergeMap(exerciseAction => {
    //                   const exerciseId = exerciseAction.payload.id;
    //                   const exerciseData = exerciseAction.payload.data() as Exercise;
  
    //                   performanceCollection = exerciseCollection.doc(exerciseId).collection<Performance>('/performances');
  
    //                   return performanceCollection
    //                       .snapshotChanges()
    //                         .map( actions2 => {
    //                           let performances1: Performance[] = actions2
    //                             .map(per => {
    //                               const id2 = per.payload.doc.id;
    //                               const data2 = per.payload.doc.data() as Performance;
    //                               return { id: id2, ...data2 };
    //                             });
    //                           return { id: exerciseId, ...exerciseData, performances: performances1};
    //                       });
    //           });

    //     });

    // exercise$ = exerciseCollection.doc('K5jDFiN5k099MYmuiV00')
    // .snapshotChanges()
    //         .mergeMap(exerciseAction => {
    //           const exerciseId = exerciseAction.payload.id;
    //           const exerciseData = exerciseAction.payload.data() as Exercise;

    //           performanceCollection = exerciseCollection.doc(exerciseId).collection<Performance>('/performances');

    //           return performanceCollection
    //               .snapshotChanges()
    //                 .map( actions2 => {
    //                   let performances1: Performance[] = actions2
    //                     .map(per => {
    //                       const id2 = per.payload.doc.id;
    //                       const data2 = per.payload.doc.data() as Performance;
    //                       return { id: id2, ...data2 };
    //                     });
    //                   return { id: exerciseId, ...exerciseData, performances: performances1};
    //               });
    //   });




    // exercise$ = exerciseCollection.doc('K5jDFiN5k099MYmuiV00')
    // .snapshotChanges()
    //         .mergeMap(exerciseAction => {
    //           const exerciseId = exerciseAction.payload.id;
    //           const exerciseData = exerciseAction.payload.data() as Exercise;

    //           performanceCollection = exerciseCollection.doc(exerciseId).collection<Performance>('/performances');

    //           return performanceCollection
    //               .snapshotChanges()
    //                 .map( actions2 => {
    //                   let performances1: Performance[] = actions2
    //                     .map(per => {
    //                       const id2 = per.payload.doc.id;
    //                       const data2 = per.payload.doc.data() as Performance;
    //                       return { id: id2, ...data2 };
    //                     });
    //                   return { id: exerciseId, ...exerciseData, performances: performances1};
    //               });
    //   });


    exercises$.subscribe(x => console.log('Exercises:' + JSON.stringify(x)));
    // exercises$.subscribe(x => console.log('Exercises:' + JSON.stringify(x)));

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
