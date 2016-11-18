import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-detail',
  inputs: ['comment'],
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {

  private comment: Comment;
  timeSincePosted: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.timeSincePosted = moment(this.comment.creationTime).fromNow();
  }
  
}
