import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { ModalModule } from 'ng2-modal';
import { AuthService } from '../auth.service';
import { CalendarEventService } from '../calendar-event.service';
import { CalEvent } from '../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
  inputs: ['removeEvent'],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../slider.css'],
  animations: [routerAnimations('routeAnimations')]
})

export class CalendarComponent implements OnInit {

  @HostBinding('@routeAnimations')
  public animatePage = true;

  selectColors = ['Red','Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
  events: FirebaseListObservable<CalEvent[]>;
  view: string = 'grid';

  constructor(private af: AngularFire, private authService: AuthService, private calendarEventService: CalendarEventService) { }

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
    this.calendarEventService.addEvent(newEventTitle, newStartUnix, newEndUnix, pickedColor, null, false, null, user);
    window.location.reload();
  }
}
