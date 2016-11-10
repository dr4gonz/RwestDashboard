import { Component, OnInit, EventEmitter } from '@angular/core';
import { CalEvent } from '../../models/calevent.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FileEntry } from '../../models/file-entry.model';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-calendar-list-item',
  inputs: ['calendarEvent'],
  outputs: ['removeEvent', 'editEvent', 'selectedFile'],
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.css']
})

export class CalendarListItemComponent implements OnInit {
  calendarEvent;
  fileList: FileEntry[] = [];
  backgroundStyle: SafeStyle = null;
  showDetails: boolean = false;
  smallScreen: boolean = false;
  private selectedFile: EventEmitter<any>;
  private removeEvent: EventEmitter<any>;
  private editEvent: EventEmitter<any>;

  constructor(private sanitizer: DomSanitizer, private af: AngularFire) {
    this.removeEvent = new EventEmitter();
    this.editEvent = new EventEmitter();
    this.selectedFile = new EventEmitter();
  }

  ngOnInit() {
    if(this.calendarEvent.files) {
      this.calendarEvent.files.forEach(key => {
        let route = '/fileEntries/' + key;
        this.af.database.object(route).subscribe(foundFile => {
          let fileObj: FileEntry = foundFile;
          this.fileList.push(fileObj);
        });
      });
    }
    if(window.innerWidth < 768) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }


  getPrimaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.primary);
  }
  getSecondaryColor(ce: CalEvent) {
    return this.sanitizer.bypassSecurityTrustStyle(ce.color.secondary);
  }
  destroyEvent() {
    this.removeEvent.emit();
  }
  expandDetails() {
    this.showDetails = true;
  }
  hideDetails() {
    this.showDetails = false;
  }
  editEventClick() {
    this.editEvent.emit();
  }
  fileSelected(key: string) {
    this.selectedFile.emit(key);
  }

}
