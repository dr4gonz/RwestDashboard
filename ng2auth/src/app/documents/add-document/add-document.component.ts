import { Component, OnInit, EventEmitter } from '@angular/core';
import { DocumentItem } from '../../models/document-item.model';

@Component({
  selector: 'app-add-document',
  outputs: ['newDocumentEvent'],
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  newDocumentEvent: EventEmitter<DocumentItem>;
  addDoc;

  constructor() {
    this.newDocumentEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  newDocumentItem(title: HTMLInputElement, link: HTMLInputElement) {
    if (title.value !== "" && this.validateLink(link.value)) {
      let newDoc: DocumentItem = new DocumentItem();
      newDoc.title = title.value;
      newDoc.link = link.value;
      title.value = "";
      link.value = "";
      this.newDocumentEvent.emit(newDoc);
      window.location.reload();
    }
  }

  validateLink(link: string) {
    try {
      let suffix = link.slice(link.length - 4);
      let prefix = link.slice(0, 33);
      if (suffix !== "/pub") {
        return false;
      } else if (prefix !== "https://docs.google.com/document/") {
        return false;
      } else return true;
    } catch (ex) {
      return false;
    }
  }

}
