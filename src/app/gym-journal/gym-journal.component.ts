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
    // 1: tener disponible un usuario por medio de login de Firebase
    // 2: tener disponible un gymJounal que depende del usuario obtenido en 1
    this.gymJournal$ = this.authService.authUser$
        .filter(user => user != null)
        .switchMap(user => this.service.findGymJournalDoc(user.uid));
    // if (this.authService.authUser) {
    //   this.gymJournal$ = this.service.findGymJournalDoc(this.authService.authUser.uid);
    // }
  }

}
