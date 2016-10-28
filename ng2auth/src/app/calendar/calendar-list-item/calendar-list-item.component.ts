import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalEvent } from '../../models/calevent.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'app-calendar-list-item',
  inputs: ['calendarEvent'],
  outputs: ['removeEvent'],
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.css']
})
export class CalendarListItemComponent implements OnInit {
  calendarEvent;
  backgroundStyle: SafeStyle = null;
  showDetails: boolean = false;
  private removeEvent: EventEmitter<any>;

  constructor(private sanitizer: DomSanitizer) {
    this.removeEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  getPrimaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.primary);
  }

  getSecondaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.secondary);
  }

  destroyEvent(ce: CalEvent) {
    this.removeEvent.emit();
  }
  expandDetails() {
    this.showDetails = true;
  }
  hideDetails() {
    this.showDetails = false;
  }

}
