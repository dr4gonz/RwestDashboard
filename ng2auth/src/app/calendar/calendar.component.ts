import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular2-calendar';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import * as moment from 'moment';
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

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendar',
  inputs: ['calendarEvents'],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  view: string = 'month';
  selectColors = ['Red','Yellow','Blue'];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService) {
  }

  ngOnInit() {
    this.events = this.getEvents();
  }

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  increment(): void {
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];
    this.viewDate = addFn(this.viewDate, 1);
  }

  decrement(): void {
    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];
    this.viewDate = subFn(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  addNewEvent() {
    let newEventTitle: string = (<HTMLInputElement>document.getElementById('newTitle')).value;
    let newStartDate: string = moment((<HTMLInputElement>document.getElementById('newStartDate')).value).toString();
    let newEndDate: string = moment((<HTMLInputElement>document.getElementById('newEndDate')).value).toString();
    let inputColor = (<HTMLInputElement>document.getElementById('newColor')).value;
    let pickedColor: any;
    switch (inputColor) {
      case "Red":
        pickedColor = colors.red;
        break;
      case "Blue":
        pickedColor = colors.blue;
        break;
      case "Yellow":
        pickedColor = colors.yellow;
        break;
      default:
        pickedColor = colors.blue;
        break;
    }
    this.calendarEventService.addEvent(newEventTitle, newStartDate, newEndDate, pickedColor, null, false, null);
    window.location.reload();
  }

  getEvents() {
    let returnedEvents: any[] = [];
    this.calendarEventService.getEvents().subscribe(dbEvents => {
      returnedEvents = [];
      dbEvents.forEach(dbEvent => {
        dbEvent.actions = this.actions;
        dbEvent.start = moment(dbEvent.start).toDate();
        dbEvent.end = moment(dbEvent.end).toDate();
        returnedEvents.push(dbEvent);
      });
    });
    return returnedEvents;
  }

}
