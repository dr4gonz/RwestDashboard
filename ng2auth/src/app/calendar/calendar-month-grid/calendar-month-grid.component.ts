import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month-grid',
  inputs: ['events'],
  templateUrl: './calendar-month-grid.component.html',
  styleUrls: ['./calendar-month-grid.component.css']
})
export class CalendarMonthGridComponent implements OnInit {
  events: FirebaseListObservable<any[]>;
  currentMonth = moment().get('month');
  constructor() { }

  ngOnInit() {
  }

  prevMonth() {
    this.currentMonth -= 1;
  }
  nextMonth() {
      this.currentMonth += 1;
  }
  displayMonth() {
    return moment().month(this.currentMonth).format('MMMM YYYY');
  }

}
