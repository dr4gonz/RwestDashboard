import { Component, OnInit, EventEmitter } from '@angular/core';
import { DocumentItem } from '../../models/document-item.model';

@Component({
  selector: 'app-remove-document',
  outputs: ['removeDocEvent'],
  templateUrl: './remove-document.component.html',
  styleUrls: ['./remove-document.component.css']
})
export class RemoveDocumentComponent implements OnInit {

  private removeDocEvent: EventEmitter<any>;

  constructor() {
    this.removeDocEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  removeDoc() {
    this.removeDocEvent.emit();
  }

}
