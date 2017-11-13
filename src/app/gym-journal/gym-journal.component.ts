import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GymJournal } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './gym-journal.component.html',
})
export class GymJournalComponent implements OnInit {
  gymJournal$: Observable<GymJournal>;

  constructor(
    private service: WorkoutService,
    public authService: AuthService) { }

  ngOnInit() {
    // Usamos switchMap porque dependemos de 2 Observables:
    // 1: tener disponible un usuario por medio de login
    // 2: tener disponible un gymJounal que se identifica por medio del usuario
    this.gymJournal$ = this.authService.authUserSubject$
        .switchMap(user => this.service.findGymJournalDoc(user.uid));
    // if (this.authService.authUser) {
    //   this.gymJournal$ = this.service.findGymJournalDoc(this.authService.authUser.uid);
    // }
  }

}
