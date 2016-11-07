import { Component, OnInit,EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-day-block',
  inputs: ['day', 'events', 'month'],
  templateUrl: './calendar-day-block.component.html',
  styleUrls: ['./calendar-day-block.component.css']
})
export class CalendarDayBlockComponent implements OnInit {
  day;
  month;
  currentDay;
  events: FirebaseListObservable<any[]>;
  constructor() { }

  ngOnInit() {
    this.currentDay = this.getDOY(this.day);
  }

  getDOY(day: number) {
    return moment().month(this.month).date(day).dayOfYear();
  }

}
