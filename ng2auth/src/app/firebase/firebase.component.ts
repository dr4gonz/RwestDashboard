import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.items = af.database.list('https://rwest-auth-login-test.firebaseio.com/New Shared Folder/');
    console.log(this.items);
  }

  ngOnInit() {
  }

}
