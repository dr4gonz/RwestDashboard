import { Component, OnInit, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-new-comment',
  inputs: ['contentItem'],
  outputs: ['newCommentEvent'],
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  private commentForm: boolean = false;
  newCommentEvent: EventEmitter<Comment>;

  constructor() {
    this.newCommentEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  toggleCommentForm() {
    this.commentForm = (!this.commentForm);
  }

  newComment(body: HTMLInputElement) {
    if (body.value !== "") {
      let newComment: Comment = new Comment();
      newComment.body = body.value;
      body.value = "";
      this.commentForm = false;
      this.newCommentEvent.emit(newComment);
    } else {
      this.commentForm = true;
    }
  }

}
