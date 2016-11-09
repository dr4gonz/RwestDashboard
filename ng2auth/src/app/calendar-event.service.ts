import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CalEvent } from './models/calevent.model';
import * as moment from 'moment';

@Injectable()
export class CalendarEventService {

  constructor(private af: AngularFire) { }


  addEvent(title: string, startDate: string, endDate: string, color: any, files: any[], allDay: boolean, cssClass: string, createdBy: string) {
    let eventRef = this.af.database.list('/events');
    let newEvent = new CalEvent(title, startDate, endDate, color, files, allDay, cssClass, createdBy);
    eventRef.push(newEvent);
  }
  getEvents() {
    let events = this.af.database.list('/events');
    return events;
  }
}
