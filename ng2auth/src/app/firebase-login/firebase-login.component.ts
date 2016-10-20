import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})
export class FirebaseLoginComponent implements OnInit {

  constructor(public af: AngularFire) { }

  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }
  ngOnInit() {
  }

}
