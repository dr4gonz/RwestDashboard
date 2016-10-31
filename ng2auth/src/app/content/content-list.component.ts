import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { ContentItem } from '../models/content-item.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'content',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css', '../slider.css'],
  animations: [routerAnimations('routeAnimations')]
})
export class ContentListComponent implements OnInit {

  @HostBinding('@routeAnimations')
  public animatePage = true;

  content: FirebaseListObservable<ContentItem[]>;
  selectedContentItem: ContentItem;
  ascOrDesc: number = 1;


  constructor(af: AngularFire, private authService: AuthService) {
    this.content = af.database.list('/contentItems');
    this.selectedContentItem = null;
  }

  ngOnInit() {
  }

  saveContent(newContentItem: ContentItem) {
    newContentItem.creationTime = moment().format();
    newContentItem.approvalStatus = "Not Approved";
    newContentItem.createdBy = this.authService.getUserEmail();
    console.log(newContentItem);
    this.content.push(newContentItem);
  }

  updateApproval(contentItem: ContentItem) {
    this.content.update(contentItem.$key, { approvalStatus: contentItem.approvalStatus })
  }

  selectContentItem(cI: ContentItem) {
    this.selectedContentItem = cI;
  }

  deselectContentItem() {
    this.selectedContentItem = null;
  }

  sortChange(sortBy: number) {
    this.ascOrDesc = sortBy;
    console.log(sortBy);
  }

}
