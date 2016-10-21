import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';
import { FileEntry } from '../models/file-entry.model';

@Component({
  selector: 'app-storage-test',
  templateUrl: './storage-test.component.html',
  styleUrls: ['./storage-test.component.css']
})
export class StorageTestComponent implements OnInit {

  fileEntries: FirebaseListObservable<FileEntry[]>;

  storage;
  storageRef;
  image;

  constructor(@Inject(FirebaseApp) firebase: any, af: AngularFire) {
    this.fileEntries = af.database.list('/fileEntries');
    console.log(this.fileEntries);
  }

  ngOnInit() {
  }

  saveFileEntry(fE: FileEntry) {
    this.fileEntries.push(fE);
    alert("File saved");
  }

}
