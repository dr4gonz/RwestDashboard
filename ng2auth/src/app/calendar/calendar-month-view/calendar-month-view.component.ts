import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month-view',
  inputs: ['events'],
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['./calendar-month-view.component.css']
})
export class CalendarMonthViewComponent implements OnInit {
  events: FirebaseListObservable<any[]>;
  currentMonth = moment().get('month');

  constructor(private af: AngularFire) {
  }

  ngOnInit() { }
  
  prevMonth() {
    this.currentMonth -= 1;
  }
  nextMonth() {
      this.currentMonth += 1;
  }
  displayMonth() {
    return moment().month(this.currentMonth).format('MMMM YYYY');
  }
  removeEvent(ce: CalEvent){
    this.events.remove(ce.$key);
  }
}