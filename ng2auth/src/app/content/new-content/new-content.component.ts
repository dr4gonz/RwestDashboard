import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContentItem } from '../content-item.model';

@Component({
  selector: 'new-content',
  outputs: ['newContentItemEvent'],
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.css']
})
export class NewContentComponent implements OnInit {

  newContentItemEvent: EventEmitter<ContentItem>;
  public formWarning: boolean = false;

  constructor() {
    this.newContentItemEvent = new EventEmitter();
  }

  addNewContent(newDescription: HTMLInputElement) {
    if (newDescription.value == "") {
      this.formWarning = true;
    } else {
      let newContentItem: ContentItem = new ContentItem();
      newContentItem.description = newDescription.value;
      this.formWarning = false;
      newDescription.value = "";
      this.newContentItemEvent.emit(newContentItem);
    }
  }

  ngOnInit() {
  }

}
