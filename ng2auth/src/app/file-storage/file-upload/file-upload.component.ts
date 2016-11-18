import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FileEntry } from '../../models/file-entry.model';
import { FileService } from '../../services/file.service';
import * as moment from 'moment';

@Component({
  selector: 'app-file-upload',
  inputs: ['projectId'],
  outputs: ['hideFormEvent'],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private fileTarget: any;
  private authService: AuthService;
  hideFormEvent: EventEmitter<any>
  private projectId: string;

  constructor(authService: AuthService, private fService: FileService) {
    this.authService = authService;
    this.hideFormEvent = new EventEmitter();
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
        let fE = new FileEntry();
        fE.fileType = file.type;
        fE.filePath = file.name;
        fE.uploaderId = id;
        fE.uploaderEmail = email;
        fE.creationTime = moment().format();
        fE.status = "not approved";
        fE.notes = notes.value;
        fE.title = title.value;
        fE.projectId = this.projectId;
        this.fService.saveFileEntry(file, fE);
        this.hideFormEvent.emit();
      }
    }
  }

  cancelUpload() {
    this.hideFormEvent.emit();
  }

}
