import { Component, OnInit, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileEntry } from '../../models/file-entry.model';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-file-preview',
  inputs: ['fileEntry'],
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {

  fileEntry: FileEntry;
  private storage;
  private firebase;
  private errorMsg: string;
  private safeUrl: SafeUrl;
  private sanitizer: DomSanitizer;
  private fileUrl: string;
  private changeRef: ChangeDetectorRef;
  private containerType: string = "";

  constructor(@Inject(FirebaseApp) firebase: any, sanitizer: DomSanitizer, changeRef: ChangeDetectorRef,) {
    this.storage = firebase.storage();
    this.sanitizer = sanitizer;
    this.changeRef = changeRef;
  }

  ngOnInit() {
    let thisRef = this;
    this.storage.ref(this.fileEntry.filePath).getDownloadURL().then(function(url) {
      thisRef.fileUrl = url;
      thisRef.safeUrl = thisRef.sanitizeUrl(url);
      thisRef.assignContainerType();
      thisRef.changeRef.detectChanges();
    }).catch(function(error) {
      console.log(error);
      thisRef.errorMsg = "Error downloading file";
    });
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  assignContainerType() {
    let types: string[] = this.fileEntry.fileType.split("/");
    let category: string = types[0];
    let type: string = types[1];
    if (type === 'tif' || type === 'tiff' || type === 'flv' || type === '3gp' || type === 'x-flv') {
      this.errorMsg = 'Unable to preview ' + type + ' files.'
      return;
    } else {
      this.containerType = category;
    }
  }

}
