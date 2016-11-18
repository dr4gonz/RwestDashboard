import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-remove-comment',
  inputs: ['comment'],
  templateUrl: './remove-comment.component.html',
  styleUrls: ['./remove-comment.component.css']
})
export class RemoveCommentComponent implements OnInit {

  private comment: Comment;

  constructor(private cService: CommentService) { }

  ngOnInit() { }

  removeComment() {
    this.cService.removeComment(this.comment.$key);
  }

}
