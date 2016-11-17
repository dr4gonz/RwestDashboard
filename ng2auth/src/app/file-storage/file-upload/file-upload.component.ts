import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FirebaseApp, AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth.service';
import { FileEntry } from '../../models/file-entry.model';
import * as moment from 'moment';

@Component({
  selector: 'app-file-upload',
  outputs: ['newFileEntryEvent', 'cancelEvent'],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private storageRef;
  private af;
  private fileTarget: any;
  private authService: AuthService;
  newFileEntryEvent: EventEmitter<FileEntry>;
  cancelEvent: EventEmitter<any>

  constructor(@Inject(FirebaseApp) firebase: any, af: AngularFire, authService: AuthService) {
    this.storageRef = firebase.storage().ref();
    this.af = af;
    this.authService = authService;
    this.newFileEntryEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  fileSelected(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileTarget = fileInput.target.files[0];
    }
  }

  fileUpload(notes: HTMLInputElement, title: HTMLInputElement) {
    if (!title.value) {
      alert ("Please enter a title");
    } else {
      let email = this.authService.getUserEmail();
      let id = this.authService.getUserId();
      let file = this.fileTarget;
      if (!file) {
        alert("Please select a file to upload.")
      } else {
        let newFileRef = this.storageRef.child(file.name);
        let eventRef = this.newFileEntryEvent;
        newFileRef.put(file).then(function() {
          let fE = new FileEntry();
          fE.fileType = file.type;
          fE.filePath = file.name;
          fE.uploaderId = id;
          fE.uploaderEmail = email;
          fE.creationTime = moment().format();
          fE.status = "not approved";
          fE.notes = notes.value;
          fE.title = title.value;
          eventRef.emit(fE);
        });
      }
    }
  }

  cancelUpload() {
    this.cancelEvent.emit();
  }

}
