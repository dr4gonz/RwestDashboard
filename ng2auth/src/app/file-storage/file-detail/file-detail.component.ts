import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileEntry } from '../../models/file-entry.model';

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

  constructor() {
    this.unselectFileEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  unselectFile() {
    this.unselectFileEvent.emit();
  }

}
