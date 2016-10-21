import { Component, OnInit, EventEmitter } from '@angular/core';
import { ContentItem } from '../../models/content-item.model';

@Component({
  selector: 'content-detail',
  inputs: ['contentItem'],
  outputs: ['hideDetailEvent'],
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  contentItem: ContentItem;
  hideDetailEvent: EventEmitter<null>;

  constructor() {
    this.hideDetailEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  hideDetail() {
    this.hideDetailEvent.emit();
  }

}
