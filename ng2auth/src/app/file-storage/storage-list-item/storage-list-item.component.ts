import { Component, OnInit } from '@angular/core';
import { FileEntry } from '../../models/file-entry.model';
import * as moment from 'moment';

@Component({
  selector: 'app-storage-list-item',
  inputs: ['fileEntry'],
  templateUrl: './storage-list-item.component.html',
  styleUrls: ['./storage-list-item.component.css']
})
export class StorageListItemComponent implements OnInit {

  private formattedTime: string
  private fileEntry: FileEntry;

  constructor() { }

  ngOnInit() {
    this.formattedTime = moment(this.fileEntry.creationTime).format('LLL');
  }

}
