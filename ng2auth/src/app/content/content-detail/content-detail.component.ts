import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContentItem } from '../content-item.model';

@Component({
  selector: 'content-detail',
  templateUrl: './content-detail.component.html',
  inputs: ['contentItem'],
  outputs: ['updateApprovalEvent'],
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  contentItem;
  updateApprovalEvent: EventEmitter<ContentItem>;

  constructor() {
    this.updateApprovalEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  updateApprovalStatus() {
    this.updateApprovalEvent.emit(this.contentItem);
  }

}
