import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContentItem } from '../../models/content-item.model';

@Component({
  selector: 'content-list-item',
  templateUrl: './content-list-item.component.html',
  inputs: ['contentItem'],
  outputs: ['updateApprovalEvent', 'viewDetailsEvent'],
  styleUrls: ['./content-list-item.component.css']
})
export class ContentListItemComponent implements OnInit {

  contentItem;
  viewDetailsEvent: EventEmitter<ContentItem>;

  constructor() {
    this.viewDetailsEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  viewDetails() {
    this.viewDetailsEvent.emit(this.contentItem);
  }

}
