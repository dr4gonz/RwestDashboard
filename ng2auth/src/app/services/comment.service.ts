import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService {

  constructor(private aF: AngularFire) { }

  getComments(parentId: string): FirebaseListObservable<Comment[]> {
    console.log(parentId);
    return this.aF.database.list('/comments', {
      query: {
        orderByChild: 'parentId',
        equalTo: parentId,
      }
    });
  }

  saveComment(newComment: Comment) {
    this.aF.database.list('/comments').push(newComment);
  }

  removeComment(id: string) {
    this.aF.database.list('/comments').remove(id);
  }
  
}
