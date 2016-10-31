import { Component, OnInit, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { AuthService } from '../../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-detail',
  inputs: ['comment'],
  outputs: ['removeCommentEvent'],
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {

  private comment: Comment;
  timeSincePosted: string;
  removeCommentEvent: EventEmitter<any>;
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.removeCommentEvent = new EventEmitter();
  }

  ngOnInit() {
    this.timeSincePosted = moment(this.comment.creationTime).fromNow();
  }

  removeComment(comment) {
    this.removeCommentEvent.emit();
  }

}
