import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import 'rxjs/add/operator/map';
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
  ascOrDesc: number = 1;
  sortBy: string = "oldest first";

  constructor(private authService: AuthService, private cService: CommentService) { }

  ngOnInit() {
    console.log(this.parentKey);
    this.comments = this.cService.getComments(this.parentKey).map(c => c.sort((a, b) => this.compareDates(a.creationTime, b.creationTime))) as FirebaseListObservable<Comment[]>;
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
    this.comments.remove(comment.$key);
  }

  toggleSort() {
    if (this.ascOrDesc === 1) {
      this.ascOrDesc = 0;
      this.sortBy = "newest first";
    } else {
      this.ascOrDesc = 1;
      this.sortBy = "oldest first";
    }
  }

}
