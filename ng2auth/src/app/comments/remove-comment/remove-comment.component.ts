import { Component, OnInit, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-remove-comment',
  outputs: ['removeCommentEvent'],
  templateUrl: './remove-comment.component.html',
  styleUrls: ['./remove-comment.component.css']
})
export class RemoveCommentComponent implements OnInit {

  comment: Comment;
  removeCommentEvent: EventEmitter<any>;

  constructor() {
    this.removeCommentEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  removeComment() {
    this.removeCommentEvent.emit();
  }

}
