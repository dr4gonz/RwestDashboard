import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
    });
  }

  saveComment(newComment: Comment) {
    newComment.authorId = this.authService.getUserId();
    newComment.author = this.authService.getUserEmail();
    newComment.parentId = this.contentItem.$key;
    newComment.timePosted = moment().format();
    this.comments.push(newComment);
  }

}
