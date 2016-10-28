import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';
import { ContentItem } from '../../models/content-item.model';
import { Comment } from '../../models/comment.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-list',
  inputs: ['parentKey'],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  parentKey: string;
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
        equalTo: this.parentKey,
      }
    }).map(c => c.sort((a, b) => this.compareDates(a.timePosted, b.timePosted))) as FirebaseListObservable<Comment[]>;
  }

  saveComment(newComment: Comment) {
    newComment.authorId = this.authService.getUserId();
    newComment.author = this.authService.getUserEmail();
    newComment.parentId = this.parentKey;
    newComment.creationTime = moment().format();
    this.comments.push(newComment);
  }

  sortChange(sortBy: number) {
    this.ascOrDesc = sortBy;
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

  removeComment(comment: Comment) {
    console.log('list');
    this.comments.remove(comment.$key);
  }

}
