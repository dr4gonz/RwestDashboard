import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DocumentItem } from '../../models/document-item.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: FirebaseListObservable<DocumentItem[]>
  af: AngularFire;
  selectedDocument: DocumentItem = null;
  iframeUrl: SafeUrl = null;
  extDocUrl: SafeUrl = null;
  authService: AuthService;

  constructor(af: AngularFire, private sanitizer: DomSanitizer, authService: AuthService) {
    this.af = af;
    this.authService = authService;
  }

  ngOnInit() {
    this.documents = this.af.database.list('/documentItems');
  }

  saveDocumentItem(newDoc: DocumentItem) {
    this.documents.push(newDoc);
  }

  selectDocument(doc: DocumentItem) {
    if (this.validateUrl(doc.link)) {
      this.selectedDocument = doc;
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.link + "?embedded=true");
      this.extDocUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.link.slice(0, -4));
    }
  }

  unselectDocument() {
    this.selectedDocument = null;
    this.iframeUrl = null;
    this.extDocUrl = null;
  }

  validateUrl(link: string) {
    try {
      let suffix = link.slice(link.length - 4);
      let prefix = link.slice(0, 33);
      if (suffix !== "/pub") {
        console.log(suffix);
        return false;
      } else if (prefix !== "https://docs.google.com/document/") {
        console.log(prefix);
        return false;
      } else return true;
    } catch (ex) {
      return false;
    }
  }

  removeDoc() {
    this.documents.remove(this.selectedDocument.$key);
    this.unselectDocument();
  }

}
