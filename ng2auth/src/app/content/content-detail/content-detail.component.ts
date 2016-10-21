import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContentItem } from '../../models/content-item.model';

@Component({
  selector: 'content-detail',
  inputs: ['contentItem'],
  outputs: ['hideDetailEvent', 'updateApprovalEvent'],
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  contentItem: ContentItem;
  hideDetailEvent: EventEmitter<null>;
  updateApprovalEvent: EventEmitter<ContentItem>;

  constructor() {
    this.hideDetailEvent = new EventEmitter();
    this.updateApprovalEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  hideDetail() {
    this.hideDetailEvent.emit();
  }
  
  updateApprovalStatus() {
    this.updateApprovalEvent.emit(this.contentItem);
  }

}
