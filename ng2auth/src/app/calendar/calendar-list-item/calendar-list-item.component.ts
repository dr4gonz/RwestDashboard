import { Component, OnInit } from '@angular/core';
import { CalEvent } from '../../models/calevent.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'app-calendar-list-item',
  inputs: ['calendarEvent'],
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.css']
})
export class CalendarListItemComponent implements OnInit {
  calendarEvent;
  backgroundStyle: SafeStyle = null;
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }
  getBackgroundColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.secondary);
  }
}
