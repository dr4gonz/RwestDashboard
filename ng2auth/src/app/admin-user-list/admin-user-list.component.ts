import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})

export class AdminUserListComponent implements OnInit {

  users: FirebaseListObservable<User[]>;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebase: any) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

}