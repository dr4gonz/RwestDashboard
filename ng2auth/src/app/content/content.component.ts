import { Component, OnInit } from '@angular/core';
import { ContentItem } from './content-item.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: FirebaseListObservable<ContentItem[]>;
  constructor(af: AngularFire, private authService: AuthService) {
    this.content = af.database.list('/contentItems');
    console.log(this.content);
  }

  ngOnInit() {
  }

  saveContent(newContentItem: ContentItem) {
    newContentItem.dateAdded = Date.now().toString();
    newContentItem.approvalStatus = "Not Approved";
    this.content.push(newContentItem);
  }

  updateApproval(contentItem: ContentItem) {
    this.content.update(contentItem.$key, { approvalStatus: contentItem.approvalStatus })
  }
}
