import { Component, Inject, OnInit, HostBinding, EventEmitter } from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { CalEvent } from '../models/calevent.model';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#F44336',
    secondary: '#FFCDD2'
  },
  orange: {
    primary: '#FF9800',
    secondary: '#FFE0B2'
  },
  yellow: {
    primary: '#FFEB3B',
    secondary: '#FFF9C4'
  },
  green: {
    primary: '#009688',
    secondary: '#B2DFDB'
  },
  blue: {
    primary: '#2196F3',
    secondary: '#BBDEFB'
  },
  purple: {
    primary: '#9C27B0',
    secondary: '#E1BEE7'
  }
};

@Component({
  selector: 'app-calendar',
  outputs: ['currentDay'],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../slider.css'],
  animations: [routerAnimations('routeAnimations')]
})

export class CalendarComponent implements OnInit {

  @HostBinding('@routeAnimations')
  public animatePage = true;

  selectColors = ['Red','Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
  events: FirebaseListObservable<CalEvent[]>;
  firebase: any;
  view: string = 'grid';
  currentDay: number = moment().dayOfYear();
  allDay: boolean = true;
  editObject: CalEvent = null;
  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService, @Inject(FirebaseApp) firebase: any) {
    this.firebase = firebase.database();
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
    let newEndDate: string = (<HTMLInputElement>document.getElementById('newEndDate')).value;
    let inputColor = (<HTMLInputElement>document.getElementById('newColor')).value;
    let newStartUnix: any;
    let newEndUnix: any;
    let allDayBool: boolean = true;

    if(!this.allDay){
      let newStartTime: string = (<HTMLInputElement>document.getElementById('newStartTime')).value;
      let newEndTime: string = (<HTMLInputElement>document.getElementById('newEndTime')).value;
      allDayBool = false;
      newStartDate = newStartDate + 'T' + newStartTime;
      newEndDate = newEndDate + 'T' + newEndTime;
      console.log(newStartDate);
      console.log(newEndDate);
    }
    let user = this.authService.getUserEmail();
    let pickedColor: any;
    switch (inputColor) {
      case "Red":
        pickedColor = colors.red;
        break;
      case "Orange":
        pickedColor = colors.orange;
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
    this.calendarEventService.addEvent(newEventTitle, newStartDate, newEndDate, pickedColor, null, allDayBool, null, user);
  }
  formReset() {
    (<HTMLInputElement>document.getElementById('newTitle')).value = null;
    (<HTMLInputElement>document.getElementById('newStartDate')).value = null;
    (<HTMLInputElement>document.getElementById('newEndDate')).value = null;
    (<HTMLInputElement>document.getElementById('newColor')).value = null;
  }
  switchView($event) {
    this.currentDay = $event.day;
    this.view = 'day';
  }
  turnOffAllDay() {
    this.allDay = false;
  }
  turnOnAllDay() {
    this.allDay = true;
  }
  editEvent($event) {
    this.editObject = $event;
  }
  submitEditedEvent() {
    let event = this.firebase.ref('events/' + this.editObject.$key);
    let editedTitle = (<HTMLInputElement>document.getElementById('eventTitle')).value;
    let editedStart = (<HTMLInputElement>document.getElementById('eventStart')).value;
    let editedEnd = (<HTMLInputElement>document.getElementById('eventEnd')).value;
    let inputColor = (<HTMLInputElement>document.getElementById('eventColor')).value;
    let editedColor: any;
    switch (inputColor) {
      case "Red":
        editedColor = colors.red;
        break;
      case "Orange":
        editedColor = colors.orange;
        break;
      case "Blue":
        editedColor = colors.blue;
        break;
      case "Yellow":
        editedColor = colors.yellow;
        break;
      case "Purple":
        editedColor = colors.purple;
        break;
      case "Green":
        editedColor = colors.green;
        break;
      default:
        editedColor = colors.blue;
        break;
    }
    event.update({"title": editedTitle, "start": editedStart, "end": editedEnd, "color": editedColor});
  }
}
