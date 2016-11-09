import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileEntry } from '../../models/file-entry.model';
import * as moment from 'moment';

@Component({
  selector: 'app-file-detail',
  inputs: ['fileEntry'],
  outputs: ['unselectFileEvent'],
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  fileEntry: FileEntry;
  unselectFileEvent: EventEmitter<any>;
  formattedTime: string;

  constructor() {
    this.unselectFileEvent = new EventEmitter();
  }

  ngOnInit() {
    this.formattedTime = moment(this.fileEntry.creationTime).format('LLL');
  }

  unselectFile() {
    this.unselectFileEvent.emit();
  }

}
