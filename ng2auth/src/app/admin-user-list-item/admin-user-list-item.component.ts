import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-admin-user-list-item',
  inputs: ['userListItem'],
  templateUrl: './admin-user-list-item.component.html',
  styleUrls: ['./admin-user-list-item.component.css']
})
export class AdminUserListItemComponent implements OnInit {
  userListItem: any;
  roles = ['User', 'Admin'];
  constructor(@Inject(FirebaseApp) firebase: any) { }

  ngOnInit() {
  }

  updateRole() {
    let newRole = (<HTMLInputElement>document.getElementById('role_' + this.userListItem.uid)).value;
    let users = firebase.database().ref("users");
    let userRef = users.ref.orderByChild("uid").equalTo(this.userListItem.uid).on("child_added", function(snapshot) {
      let userId = snapshot.key;
      let user = firebase.database().ref('users/' + userId);
      user.update({"role": newRole});
    });
  }

  deleteUser() {
    let users = firebase.database().ref("users");
    let userRef = users.ref.orderByChild("uid").equalTo(this.userListItem.uid).on("child_added", function(snapshot) {
      let userId = snapshot.key;
      let user = firebase.database().ref('users/' + userId);
      user.remove();
    });
  }

}
