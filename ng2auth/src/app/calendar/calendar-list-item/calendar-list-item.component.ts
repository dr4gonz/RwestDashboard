import { Component, OnInit } from '@angular/core';
import { CalEvent } from '../../models/calevent.model';

@Component({
  selector: 'app-calendar-list-item',
  inputs: ['calendarEvent'],
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.css']
})
export class CalendarListItemComponent implements OnInit {
  calendarEvent;
  constructor() { }

  ngOnInit() {
  }

}
