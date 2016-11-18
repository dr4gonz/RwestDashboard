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

  constructor(private authService: AuthService, private cService: CommentService) { }

  ngOnInit() {
    console.log(this.parentKey);
    this.comments = this.cService.getComments(this.parentKey).map(c => c.sort((a, b) => this.compareDates(a.creationTime, b.creationTime))) as FirebaseListObservable<Comment[]>;
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
    this.comments.remove(comment.$key);
  }

}
