import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../services/calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-week-view',
  inputs: ['events'],
  outputs: ['eventToEdit','selectedFile'],
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.css']
})
export class CalendarWeekViewComponent implements OnInit {
  currentWeek = moment().week();
  events: FirebaseListObservable<any[]>;
  private eventToEdit: EventEmitter<any>;
  private selectedFile: EventEmitter<any>;

  constructor(private af: AngularFire) {
    this.eventToEdit = new EventEmitter();
    this.selectedFile = new EventEmitter();
  }

  ngOnInit() { }

  prevWeek() {
    this.currentWeek -= 1;
  }
  nextWeek() {
      this.currentWeek += 1;
  }
  displayWeek() {
    return moment().startOf('week').week(this.currentWeek).format('MMMM Do YYYY');
  }
  removeEvent(ce: CalEvent){
    this.events.remove(ce.$key);
  }
  editEvent(ce: CalEvent) {
    this.eventToEdit.emit(ce);
  }
  fileSelected($event: any) {
    this.selectedFile.emit($event);
  }

}
