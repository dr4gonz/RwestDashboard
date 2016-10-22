import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../auth.service';
import { ContentItem } from '../../models/content-item.model';
import { Comment } from '../../models/comment.model';

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
  auth: AuthService;

  constructor(af: AngularFire, auth: AuthService) {
    this.af = af;
  }

  ngOnInit() {
    console.log(this.contentItem);
    this.comments = this.af.database.list('/comments', {
      query: {
        orderByChild: 'parentId',
        equalTo: this.contentItem.$key,
      }
    });
  }

  saveComment(newComment: Comment) {
    newComment.authorId = this.auth.loggedInUser.uid;
    newComment.author = this.auth.loggedInUser.email;
    newComment.parentId = this.contentItem.$key;

    this.comments.push(newComment);
  }

}
