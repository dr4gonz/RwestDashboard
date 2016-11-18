import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileEntry } from '../../models/file-entry.model';
import { FileService } from '../../services/file.service';
import { FirebaseObjectObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-file-detail',
  inputs: ['id'],
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  fileEntry: FirebaseObjectObservable<FileEntry>;
  private fileType: string;
  private fE: FileEntry;
  private formattedTime: string;
  private id: string;
  private fileUrl: string;
  private safeUrl: SafeUrl;
  private containerType: string = "";
  private errorMsg: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private fService: FileService) {
    let id: string;
    let thisRef = this;
    this.route.params.forEach((params: Params) => {
      id = params['id'];
    })
    this.id = id;
    this.fileEntry = this.fService.getFileEntry(id);
  }

  ngOnInit() {
    this.formattedTime = moment(this.fileEntry['creationTime']).format('LLL');
  }

  approve() {
    this.fileEntry.update({ status: 'approved'});
  }

  reject() {
    this.fileEntry.update({ status: 'rejected' });
  }

  unapprove() {
    this.fileEntry.update({ status: 'not approved' });
  }

}
