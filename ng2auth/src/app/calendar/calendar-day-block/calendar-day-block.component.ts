import { Component, OnInit,EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-day-block',
  inputs: ['day'],
  templateUrl: './calendar-day-block.component.html',
  styleUrls: ['./calendar-day-block.component.css']
})
export class CalendarDayBlockComponent implements OnInit {
  day;
  constructor() { }

  ngOnInit() {
  }

}
