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
  private safeUrl: SafeUrl;
  private sanitizer: DomSanitizer;
  private fileUrl: string;
  private ref: ChangeDetectorRef;

  constructor(@Inject(FirebaseApp) firebase: any, sanitizer: DomSanitizer, ref: ChangeDetectorRef,) {
    this.unselectFileEvent = new EventEmitter();
    this.storage = firebase.storage();
    this.sanitizer = sanitizer;
    this.ref = ref;
  }

  /*** Acceptable filetypes to embed ***
    * jpg/jpeg
    * mp4
    * pdf
    * webm
    * ogg
    * png
  **************************************/


  ngOnInit() {
    let thisRef = this;
    this.storage.ref(this.fileEntry.filePath).getDownloadURL().then(function(url) {
      thisRef.fileUrl = url;
      thisRef.safeUrl = thisRef.sanitizeUrl(url);
      thisRef.ref.detectChanges();
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
