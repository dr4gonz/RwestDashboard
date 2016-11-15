import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalEvent } from '../../../models/calevent.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-upcoming-events-list-item',
  inputs: ['calendarEvent'],
  templateUrl: './upcoming-events-list-item.component.html',
  styleUrls: ['./upcoming-events-list-item.component.css']
})
export class UpcomingEventsListItemComponent implements OnInit {
  calendarEvent;
  showDetails: boolean = false;

  constructor(private sanitizer: DomSanitizer, private af: AngularFire) {
  }

  ngOnInit() {
  }

  expandDetails() {
    this.showDetails = true;
  }
  hideDetails() {
    this.showDetails = false;
  }

}
