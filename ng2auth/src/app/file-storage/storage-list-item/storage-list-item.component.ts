import { Component, OnInit } from '@angular/core';
import { FileEntry } from '../../models/file-entry.model';

@Component({
  selector: 'app-storage-list-item',
  inputs: ['fileEntry'],
  templateUrl: './storage-list-item.component.html',
  styleUrls: ['./storage-list-item.component.css']
})
export class StorageListItemComponent implements OnInit {

  fileEntry: FileEntry;

  constructor() { }

  ngOnInit() {
  }

}
