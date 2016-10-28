import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CalEvent } from './models/calevent.model';
import * as moment from 'moment';

@Injectable()
export class CalendarEventService {

  constructor(private af: AngularFire) { }


  addEvent(title: string, startDate: number, endDate: number, color: any, actions: any[], allDay: boolean, cssClass: string) {
    let eventRef = this.af.database.list('/events');
    let newEvent = new CalEvent(title, startDate, endDate, color, actions, allDay, cssClass);
    eventRef.push(newEvent);
  }
  getEvents() {
    let events = this.af.database.list('/events');
    return events;
  }
}
