import { Component, Inject, OnInit, HostBinding, EventEmitter } from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { CalEvent } from '../models/calevent.model';
import { FileEntry } from '../models/file-entry.model';
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

  allDay: boolean = true;
  currentDay: number = moment().dayOfYear();
  editObject: CalEvent = null;
  events: FirebaseListObservable<CalEvent[]>;
  files: FirebaseListObservable<FileEntry[]>;
  firebase: any;
  selectColors = ['Red','Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
  view: string = 'grid';

  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService, @Inject(FirebaseApp) firebase: any) {
    this.firebase = firebase.database();
    this.events = af.database.list('/events', {
      query: {
        orderByChild: 'start'
      }
    });
  }

  ngOnInit() {
    this.getFiles();
  }

  addNewEvent() {
    let newEventTitle: string = (<HTMLInputElement>document.getElementById('newTitle')).value;
    let newStartDate: string = (<HTMLInputElement>document.getElementById('newStartDate')).value;
    let newEndDate: string = (<HTMLInputElement>document.getElementById('newEndDate')).value;
    let newFiles: string[] = [];
    newFiles.push((<HTMLInputElement>document.getElementById('attachFile')).value);
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
    }
    let user = this.authService.getUserEmail();
    let pickedColor: any = this.getColor(inputColor);
    this.calendarEventService.addEvent(newEventTitle, newStartDate, newEndDate, pickedColor, newFiles, allDayBool, null, user);
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
  getColor(inputColor: string) {
    switch (inputColor) {
      case "Red":
        return colors.red;
      case "Orange":
        return colors.orange;
      case "Blue":
        return colors.blue;
      case "Yellow":
        return colors.yellow;
      case "Purple":
        return colors.purple;
      case "Green":
        return colors.green;
      default:
        return colors.blue;
    }
  }
  submitEditedEvent() {
    let event = this.firebase.ref('events/' + this.editObject.$key);
    let editedTitle = (<HTMLInputElement>document.getElementById('eventTitle')).value;
    let editedStart = (<HTMLInputElement>document.getElementById('eventStart')).value;
    let editedEnd = (<HTMLInputElement>document.getElementById('eventEnd')).value;
    let inputColor = (<HTMLInputElement>document.getElementById('eventColor')).value;
    let editedColor: any = this.getColor(inputColor);
    event.update({"title": editedTitle, "start": editedStart, "end": editedEnd, "color": editedColor});
  }
  getFiles() {
    this.files = this.af.database.list('/fileEntries');
  }
}
