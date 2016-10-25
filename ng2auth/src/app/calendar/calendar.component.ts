import { Component, OnInit } from '@angular/core';
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
import {
  CalendarEvent,
  CalendarEventAction
} from 'angular2-calendar';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

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
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: string = 'month';
  selectColors = ['Red','Yellow','Blue'];

  viewDate: Date = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit() {
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

  events: CalendarEvent[] = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue,
    actions: this.actions
  }];

  activeDayIsOpen: boolean = true;

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
    let newStartDate: Date = moment((<HTMLInputElement>document.getElementById('newStartDate')).value).toDate();
    let newEndDate: Date = moment((<HTMLInputElement>document.getElementById('newEndDate')).value).toDate();
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
    // console.log('Title: ' + newEventTitle);
    // console.log('Start Date: ' + newStartDate);
    // console.log('End Date: ' + newEndDate);
    // console.log('Color: ' + pickedColor);

    let newEvent: CalendarEvent = {start: newStartDate, end: newEndDate, title: newEventTitle, color: pickedColor, actions: this.actions, allDay: false, cssClass: null};
    this.events.push(newEvent);
  }

}
