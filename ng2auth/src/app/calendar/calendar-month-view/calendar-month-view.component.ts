import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month-view',
  inputs: ['events'],
  outputs: ['eventToEdit'],
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['./calendar-month-view.component.css']
})
export class CalendarMonthViewComponent implements OnInit {
  events: FirebaseListObservable<any[]>;
  currentMonth = moment().get('month');
  private eventToEdit: EventEmitter<any>;

  constructor(private af: AngularFire) {
    this.eventToEdit = new EventEmitter();
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
  editEvent(ce: CalEvent) {
    this.eventToEdit.emit(ce);
  }
}
