import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { CalEvent } from '../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
  },
  green: {
    primary: '#067a06',
    secondary: '#c8f7c8'
  },
  purple: {
    primary: '#3e0e82',
    secondary: '#dbc8f7'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  selectColors = ['Red','Yellow','Blue', 'Green', 'Purple'];
  viewDate: Date = new Date();
  events: FirebaseListObservable<CalEvent[]>;
  activeDayIsOpen: boolean = true;
  currentMonth = moment().get('month');
  showAllEvents: boolean = false;

  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService) {
  }

  ngOnInit() {
    this.events = this.af.database.list('/events', {
      query: {
        orderByChild: 'start'
      }
    });
  }
  addNewEvent() {
    let newEventTitle: string = (<HTMLInputElement>document.getElementById('newTitle')).value;
    let newStartDate: string = (<HTMLInputElement>document.getElementById('newStartDate')).value;
    let newStartTime: string = (<HTMLInputElement>document.getElementById('newStartTime')).value;
    let newEndDate: string = (<HTMLInputElement>document.getElementById('newEndDate')).value;
    let newEndTime: string = (<HTMLInputElement>document.getElementById('newEndTime')).value;
    let inputColor = (<HTMLInputElement>document.getElementById('newColor')).value;
    let newStartUnix = moment(newStartDate+"T"+newStartTime).unix() * 1000;
    let newEndUnix = moment(newEndDate+"T"+newEndTime).unix() * 1000;
    let user = this.authService.getUserEmail();
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
      case "Purple":
        pickedColor = colors.purple;
        break;
      case "Green":
        pickedColor = colors.green;
        break;
      default:
        pickedColor = colors.blue;
        break;
    }
    this.calendarEventService.addEvent(newEventTitle, newStartUnix, newEndUnix, pickedColor, null, false, null, user);
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
  showAll() {
    this.showAllEvents = true;
  }
  showMonth() {
    this.showAllEvents = false;
  }
  removeEvent(ce: CalEvent){
    this.events.remove(ce.$key);
  }
}
