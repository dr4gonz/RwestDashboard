import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular2-calendar';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CalEvent } from './models/calevent.model';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths
} from 'date-fns';

@Injectable()
export class CalendarEventService {

  constructor(private af: AngularFire) { }

  addEvent(title: string, startDate: string, endDate: string, color: any, actions: any[], allDay: boolean, cssClass: string) {
    let eventRef = this.af.database.list('/events');
    let newEvent = new CalEvent(title, startDate, endDate, color, actions, allDay, cssClass);
    eventRef.push(newEvent);
  }
  getEvents() {
    return this.af.database.list('/events');
  }
}