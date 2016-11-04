import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';
import { FileEntry } from '../models/file-entry.model';

@Component({
  selector: 'app-file-storage',
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css']
})
export class FileStorageComponent implements OnInit {

  fileEntries: FirebaseListObservable<FileEntry[]>;

  storage;
  storageRef;
  image;
  showDetail: boolean = false;
  selectedFile: FileEntry = null;

  constructor(af: AngularFire) {
    this.fileEntries = af.database.list('/fileEntries');
  }

  ngOnInit() {
  }

  saveFileEntry(fE: FileEntry) {
    this.fileEntries.push(fE);
    alert("File saved");
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  selectFile(fE: FileEntry) {
    this.selectedFile = fE;
    this.toggleDetail();
  }

  unselectFile() {
    this.selectedFile = null;
    this.toggleDetail();
  }

}
