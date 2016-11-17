import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../services/calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month-grid',
  inputs: ['events'],
  outputs: ['dayClicked'],
  templateUrl: './calendar-month-grid.component.html',
  styleUrls: ['./calendar-month-grid.component.css']
})
export class CalendarMonthGridComponent implements OnInit {
  events: FirebaseListObservable<any[]>;
  currentMonth = moment().get('month');
  monthArray: any[] = [];
  prevOffset: number = 0;
  follOffset: number = 0;
  currentDay = moment().dayOfYear();
  private dayClicked: EventEmitter<any>;
  constructor() {
    this.dayClicked = new EventEmitter();
  }

  ngOnInit() {
    this.constructMonthArray();
  }

  prevMonth() {
    this.currentMonth--;
    this.constructMonthArray();
  }
  nextMonth() {
    this.currentMonth++;
    this.constructMonthArray();
  }

  displayMonth() {
    return moment().month(this.currentMonth).format('MMMM YYYY');
  }

  constructMonthArray() {
    this.monthArray = [];
    let days = moment().month(this.currentMonth).daysInMonth();
    let firstDay = moment().month(this.currentMonth).startOf('month').format('ddd');
    let lastDay = moment().month(this.currentMonth).endOf('month').format('ddd');
    this.monthPrevOffset(firstDay);
    this.monthFollOffset(lastDay);
    let daysInPreviousMonth = moment().month(this.currentMonth - 1).daysInMonth();
    for(let i = 0 - this.prevOffset; i < days + this.follOffset; i++) {
      this.monthArray.push(moment().month(this.currentMonth).date(i+1).dayOfYear());
    }
  }

  monthPrevOffset(dow: string) {
    switch (dow) {
      case "Sun":
        this.prevOffset = 0;
        break;
      case "Mon":
        this.prevOffset = 1;
        break;
      case "Tue":
        this.prevOffset = 2;
        break;
      case "Wed":
        this.prevOffset = 3;
        break;
      case "Thu":
        this.prevOffset = 4;
        break;
      case "Fri":
        this.prevOffset = 5;
        break;
      case "Sat":
        this.prevOffset = 6;
        break;
      default:
        this.prevOffset = 0;
        break;
    }
  }

  monthFollOffset(dow: string) {
    switch (dow) {
      case "Sun":
        this.follOffset = 6;
        break;
      case "Mon":
        this.follOffset = 5;
        break;
      case "Tue":
        this.follOffset = 4;
        break;
      case "Wed":
        this.follOffset = 3;
        break;
      case "Thu":
        this.follOffset = 2;
        break;
      case "Fri":
        this.follOffset = 1;
        break;
      case "Sat":
        this.follOffset = 0;
        break;
      default:
        this.follOffset = 6;
        break;
    }
  }

  showDay(day: number) {
    this.dayClicked.emit({day: day});
  }
  getDOY(day: number) {
    return moment().date(day).dayOfYear();
  }

}
