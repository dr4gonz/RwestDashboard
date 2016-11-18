import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-comment',
  inputs: ['parentKey'],
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  private commentForm: boolean = false;
  private parentKey: string;

  constructor(private cService: CommentService, private authService: AuthService) { }

  ngOnInit() { }

  toggleCommentForm() {
    this.commentForm = (!this.commentForm);
  }

  newComment(body: HTMLInputElement) {
    if (body.value !== "") {
      let newComment: Comment = new Comment();
      newComment.body = body.value;
      newComment.parentId = this.parentKey;
      newComment.authorId = this.authService.getUserId();
      newComment.author = this.authService.getUserEmail();
      newComment.creationTime = moment().format();
      this.cService.saveComment(newComment);
      body.value = "";
      this.commentForm = false;
    } else {
      this.commentForm = true;
    }
  }

}
