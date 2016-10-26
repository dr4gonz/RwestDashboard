import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DocumentItem } from '../../models/document-item.model';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: FirebaseListObservable<DocumentItem[]>
  af: AngularFire;
  selectedDocument: DocumentItem = null;
  iframeHtml: SafeHtml = null;

  constructor(af: AngularFire, private sanitizer: DomSanitizer) {
    this.af = af;
  }

  ngOnInit() {
    this.documents = this.af.database.list('/documentItems');
  }

  saveDocumentItem(newDoc: DocumentItem) {
    console.log(newDoc);
    this.documents.push(newDoc);
  }

  selectDocument(doc: DocumentItem) {
    this.selectedDocument = doc;
    this.iframeHtml = this.sanitizer.bypassSecurityTrustHtml(doc.link);
  }

  unselectDocument() {
    this.selectedDocument = null;
    this.iframeHtml = null;
  }

}
