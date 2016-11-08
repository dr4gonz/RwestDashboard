import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-day-view',
  inputs: ['events', 'day'],
  outputs: ['eventToEdit'],
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.css']
})
export class CalendarDayViewComponent implements OnInit {
  day;
  currentDay: number;
  events: FirebaseListObservable<any[]>;
  private eventToEdit: EventEmitter<any>;

  constructor(private af: AngularFire) {
    this.eventToEdit = new EventEmitter();
  }

  ngOnInit() {
    this.currentDay = this.day;
  }

  prevDay() {
    this.currentDay -= 1;
  }
  nextDay() {
      this.currentDay += 1;
  }
  displayDay() {
    return moment().dayOfYear(this.currentDay).format('ddd MMMM Do YYYY');
  }
  removeEvent(ce: CalEvent){
    this.events.remove(ce.$key);
  }
  editEvent(ce: CalEvent) {
    this.eventToEdit.emit(ce);
  }

}
