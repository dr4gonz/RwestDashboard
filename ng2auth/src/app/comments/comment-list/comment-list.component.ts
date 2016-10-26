import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';
import { ContentItem } from '../../models/content-item.model';
import { Comment } from '../../models/comment.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-list',
  inputs: ['contentItem'],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  contentItem: ContentItem;
  comments: FirebaseListObservable<Comment[]>;
  af: AngularFire;
  authService: AuthService;
  ascOrDesc: number = 1;

  constructor(af: AngularFire, authService: AuthService) {
    this.af = af;
    this.authService = authService;
  }

  ngOnInit() {
    this.comments = this.af.database.list('/comments', {
      query: {
        orderByChild: 'parentId',
        equalTo: this.contentItem.$key,
      }
    }).map(c => c.sort((a, b) => this.compareDates(a.timePosted, b.timePosted))) as FirebaseListObservable<Comment[]>;
  }

  saveComment(newComment: Comment) {
    newComment.authorId = this.authService.getUserId();
    newComment.author = this.authService.getUserEmail();
    newComment.parentId = this.contentItem.$key;
    newComment.timePosted = moment().format();
    this.comments.push(newComment);
  }

  sortComments() {
    // JavaScript's sort method expects a callback function that returns -1 if two adjactent
    // items are in the incorrect order, 1 if they are in the correct order, and 0 if they are identical.
    // As such, sortComments expects an argument of either 1 (which it defaults to with no arg) or -1 (or 0).
    return this.comments.map(c => c.sort((a, b) => this.compareDates(a.timePosted, b.timePosted) * this.ascOrDesc)) as FirebaseListObservable<Comment[]>;
  }

  sortChange(sortBy: number) {
    this.ascOrDesc = sortBy;
    this.comments = this.sortComments();
  }

  compareDates(a: string, b: string): number {
    try {
      let aAsInt = moment(a).unix();
      let bAsInt = moment(b).unix();
      if (aAsInt > bAsInt) return 1;
      else if (aAsInt === bAsInt) return 0;
      else return -1;
    } catch(ex) {
      console.log(ex);
      return 0;
    }
  }

}
