import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-month-grid',
  inputs: ['events'],
  templateUrl: './calendar-month-grid.component.html',
  styleUrls: ['./calendar-month-grid.component.css']
})
export class CalendarMonthGridComponent implements OnInit {
  events: FirebaseListObservable<any[]>;
  currentMonth = moment().get('month');
  monthArray: any[] = [];
  prevOffset: number = 0;
  follOffset: number = 0;
  constructor() { }

  ngOnInit() {
    this.numberDaysInMonth();
  }

  prevMonth() {
    this.currentMonth -= 1;
    console.log(this.currentMonth);
    this.monthArray = [];
    this.numberDaysInMonth();
  }
  nextMonth() {
    this.currentMonth += 1;
    console.log(this.currentMonth);
    this.monthArray = [];
    this.numberDaysInMonth();
  }

  displayMonth() {
    return moment().month(this.currentMonth).format('MMMM YYYY');
  }

  numberDaysInMonth() {
    let days = moment().month(this.currentMonth).daysInMonth();
    console.log('total days: ' + days);
    let firstDay = moment().month(this.currentMonth).startOf('month').format('ddd');
    console.log('first day: ' + firstDay);
    let lastDay = moment().month(this.currentMonth).endOf('month').format('ddd');
    console.log('last day: ' + lastDay);
    this.monthPrevOffset(firstDay);
    this.monthFollOffset(lastDay);
    console.log('prevoffset: ' + this.prevOffset);
    console.log('folloffset: ' + this.follOffset);
    let daysInPreviousMonth = moment().month(this.currentMonth - 1).daysInMonth();
    //add days in monthArray for current month
    for(let i = 0; i < days; i++) {
      this.monthArray.push(i+1);
    }
    //add days at beginning of monthArray
    for(let j = 0; j < this.prevOffset; j++) {
      this.monthArray.unshift(daysInPreviousMonth);
      daysInPreviousMonth -= 1;
    }
    //add days at end of monthArray
    for(let k = 0; k < this.follOffset; k++) {
      this.monthArray.push(k+1);
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

}
