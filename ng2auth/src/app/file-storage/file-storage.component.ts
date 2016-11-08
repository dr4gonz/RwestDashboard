import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
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
  changeRef: ChangeDetectorRef;
  statusMessage: string;
  showUpload: boolean = false;

  constructor(af: AngularFire, changeRef: ChangeDetectorRef) {
    this.fileEntries = af.database.list('/fileEntries');
    this.changeRef = changeRef;
  }

  ngOnInit() {
  }

  saveFileEntry(fE: FileEntry) {
    let thisRef = this;
    this.fileEntries.push(fE).then(function() {
      thisRef.statusMessage = "File uploaded successfully.";
    }).catch(function(error) {
      thisRef.statusMessage = "Error saving file...";
      console.log("error:", error);
    });
    this.showUpload = false;
    thisRef.changeRef.detectChanges();
  }

  showUploadAction() {
    this.showUpload = true;
    console.log("ding");
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
