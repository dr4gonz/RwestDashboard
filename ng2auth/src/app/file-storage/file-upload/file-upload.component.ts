import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FirebaseApp, AngularFire } from 'angularfire2';
import { FileEntry } from '../../models/file-entry.model';

@Component({
  selector: 'app-file-upload',
  outputs: ['newFileEntryEvent'],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private storageRef;
  private af;
  newFileEntryEvent: EventEmitter<FileEntry>;

  constructor(@Inject(FirebaseApp) firebase: any, af: AngularFire) {
    this.storageRef = firebase.storage().ref();
    this.af = af;
    this.newFileEntryEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      let file = fileInput.target.files[0];
      let newFileRef = this.storageRef.child(file.name);
      let eventRef = this.newFileEntryEvent;
      newFileRef.put(file).then(function() {
        let fE = new FileEntry();
        fE.fileType = file.type;
        fE.filePath = file.name;
        eventRef.emit(fE);
      });
    }
  }

}
