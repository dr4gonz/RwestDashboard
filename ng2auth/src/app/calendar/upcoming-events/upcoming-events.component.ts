import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalendarEventService } from '../../services/calendar-event.service';
import { CalEvent } from '../../models/calevent.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-upcoming-events',
  inputs: ['events'],
  outputs: ['eventToEdit','selectedFile'],
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {
  currentWeek = moment().week();
  events: FirebaseListObservable<any[]>;
  private eventToEdit: EventEmitter<any>;
  private selectedFile: EventEmitter<any>;

  constructor(private af: AngularFire) {
    this.eventToEdit = new EventEmitter();
    this.selectedFile = new EventEmitter();
  }

  ngOnInit() {
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
