import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GymJournal } from '../../environments/interfaces';
import { WorkoutService } from '../workout/workout.service';

@Component({
  selector: 'app-gym-journal',
  templateUrl: './gym-journal.component.html',
  styles: []
})
export class GymJournalComponent implements OnInit {
  gymJournal$: Observable<GymJournal>;

  constructor(private service: WorkoutService) { }

  ngOnInit() {
    this.gymJournal$ = this.service.findGymJournalDoc('pmoraga');
  }

}
