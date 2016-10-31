import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.css']
})
export class CalendarWeekViewComponent implements OnInit {
  currentWeek = moment().week();
  weeksInYear = moment().weeksInYear();
  events: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.events = this.af.database.list('/events', {
      query: {
        orderByChild: 'start'
      }
    });
  }
  prevWeek() {
    this.currentWeek -= 1;
  }
  nextWeek() {
      this.currentWeek += 1;
  }
  displayWeek() {
    return moment().week(this.currentWeek).format('MMMM YYYY WW');
  }
  removeEvent(ce: CalEvent){
    this.events.remove(ce.$key);
  }

}
