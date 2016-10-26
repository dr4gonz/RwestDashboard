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
    if (title.value !== "" && link.value !== "") {
      let newDoc: DocumentItem = new DocumentItem();
      newDoc.title = title.value;
      newDoc.link = link.value;
      title.value = "";
      link.value = "";
      this.newDocumentEvent.emit(newDoc);
      window.location.reload();
    }
  }

}
