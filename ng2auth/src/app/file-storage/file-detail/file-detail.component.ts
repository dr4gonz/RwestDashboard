import { Component, OnInit, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileEntry } from '../../models/file-entry.model';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-file-detail',
  inputs: ['fileEntry'],
  outputs: ['unselectFileEvent'],
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  fileEntry: FileEntry;
  unselectFileEvent: EventEmitter<any>;
  private storage;
  private firebase;
  private errorMsg: string;
  private imgUrl: SafeUrl = null;
  private sanitizer: DomSanitizer;
  private url: string;
  private ref: ChangeDetectorRef;

  constructor(@Inject(FirebaseApp) firebase: any, sanitizer: DomSanitizer, ref: ChangeDetectorRef,) {
    this.unselectFileEvent = new EventEmitter();
    this.storage = firebase.storage();
    this.sanitizer = sanitizer;
    this.ref = ref;
  }

  ngOnInit() {
    let thisRef = this;
    this.storage.ref(this.fileEntry.filePath).getDownloadURL().then(function(url) {
      console.log("In the then block");
      thisRef.url = url;
      thisRef.ref.detectChanges();
      console.log(url);
    }).catch(function(error) {
      console.log(error);
      thisRef.errorMsg = "Error downloading file";
    });
  }

  sanitizeUrl(url: string) {
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  unselectFile() {
    this.unselectFileEvent.emit();
  }

}
