import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-user-list',
  inputs: ['users'],
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})

export class AdminUserListComponent implements OnInit {

  users: FirebaseListObservable<User[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
