import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { MailDeliveryService } from '../mail-delivery.service';
import { CalEvent } from '../models/calevent.model';
import { FileEntry } from '../models/file-entry.model';
import { User } from '../models/user.model';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

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
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  allDay: boolean = true;
  showNotify: boolean = false;
  currentDay: number = moment().dayOfYear();
  editObject: CalEvent = null;
  events: FirebaseListObservable<CalEvent[]>;
  files: FirebaseListObservable<FileEntry[]>;
  firebase: any;
  selectColors = ['Red','Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
  view: string = 'grid';
  showFileDetail: boolean = false;
  selectedFile: FileEntry = null;
  users: FirebaseListObservable<User[]>;

  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService, @Inject(FirebaseApp) firebase: any, private mail: MailDeliveryService) {
    this.firebase = firebase.database();
    this.events = af.database.list('/events', {
      query: {
        orderByChild: 'start'
      }
    });
    this.users = af.database.list('/users');
  }

  ngOnInit() {
    this.getFiles();
    if(window.innerWidth < 768) {
      this.view = 'month';
    }
  }

  addNewEvent() {
    console.log((<HTMLInputElement>document.getElementById('notify')).value);
    let newEventTitle: string = (<HTMLInputElement>document.getElementById('newTitle')).value;
    let newStartDate: string = (<HTMLInputElement>document.getElementById('newStartDate')).value;
    let newEndDate: string = (<HTMLInputElement>document.getElementById('newStartDate')).value;
    if (newEventTitle && newStartDate) {
      let newFiles: string[] = [];
      let fileOptions = (<HTMLSelectElement>document.getElementById('attachFile'));
      let length: number = fileOptions.length;
      for(let i = 0; i < length; i++) {
        let opt = fileOptions[i];
        if (opt.selected) newFiles.push(opt.value);
      }
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

      if (this.showNotify) {
        let recipients: string[] = [];
        let recipOptions = (<HTMLSelectElement>document.getElementById('recipients'));
        let recipOptionsLength: number = recipOptions.length;
        for(let i = 0; i < recipOptionsLength; i++) {
          let opt = recipOptions[i];
          if (opt.selected) recipients.push(opt.value);
        }
        this.mail.sendMail(recipients, user, "test", "testbody").subscribe();
      }
      window.location.reload();
    }
  }

  formReset() {
    (<HTMLInputElement>document.getElementById('newTitle')).value = null;
    (<HTMLInputElement>document.getElementById('newStartDate')).value = null;
    // (<HTMLInputElement>document.getElementById('newEndDate')).value = null;
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

  fileSelected($event: any) {
    let route = '/fileEntries/' + $event;
    let selected = this.af.database.object(route).subscribe(file => {
      this.selectedFile = file;
      this.showFileDetail = true;
    });
  }

  fileUnselected() {
    this.showFileDetail = false;
  }

  showNotificationForm() {
    this.showNotify = true;
  }

  hideNotificationForm() {
    this.showNotify = false;
  }
}
