import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-list-item',
  inputs: ['userListItem'],
  templateUrl: './admin-user-list-item.component.html',
  styleUrls: ['./admin-user-list-item.component.css']
})
export class AdminUserListItemComponent implements OnInit {
  userListItem: any;
  constructor() { }

  ngOnInit() {
  }

}
