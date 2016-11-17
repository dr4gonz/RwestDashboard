import { Component, OnInit,EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../services/calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar-day-block-detail',
  inputs: ['calendarEvent'],
  templateUrl: './calendar-day-block-detail.component.html',
  styleUrls: ['./calendar-day-block-detail.component.css']
})
export class CalendarDayBlockDetailComponent implements OnInit {
  calendarEvent;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getPrimaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.primary);
  }
  getSecondaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.secondary);
  }

}
