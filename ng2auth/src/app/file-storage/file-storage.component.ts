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
  statusMessage: string;
  showUpload: boolean = false;

  constructor(af: AngularFire) {
    this.fileEntries = af.database.list('/fileEntries');
  }

  ngOnInit() {
  }

  saveFileEntry(fE: FileEntry) {
    let thisRef = this;
    this.fileEntries.push(fE).then(function() {
      thisRef.statusMessage = "File uploaded successfully.";
      thisRef.showUpload = false;
      window.location.reload;
    }).catch(function(error) {
      thisRef.statusMessage = "Error saving file...";
      console.log("error:", error);
      window.location.reload;
    });
  }

  showUploadAction() {
    this.statusMessage = "";
    this.showUpload = true;
  }

  toggleDetail() {
    this.statusMessage = "";
    this.showDetail = !this.showDetail;
  }

  selectFile(fE: FileEntry) {
    this.statusMessage = "";
    this.selectedFile = fE;
    this.toggleDetail();
  }

  unselectFile() {
    this.statusMessage = "";
    this.selectedFile = null;
    this.toggleDetail();
  }

  hideUploadForm() {
    this.showUpload = false;
  }

}
