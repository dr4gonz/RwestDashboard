import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.css']
})
export class CalendarDayViewComponent implements OnInit {
  currentDay = moment().dayOfYear();
  events: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  ngOnInit() {this.events = this.af.database.list('/events', {
    query: {
      orderByChild: 'start'
    }
  });
}
prevDay() {
  this.currentDay -= 1;
}
nextDay() {
    this.currentDay += 1;
}
displayDay() {
  return moment().dayOfYear(this.currentDay).format('MMMM Do YYYY');
}
removeEvent(ce: CalEvent){
  this.events.remove(ce.$key);
}

}
