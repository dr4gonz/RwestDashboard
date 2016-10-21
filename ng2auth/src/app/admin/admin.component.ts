import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: FirebaseListObservable<User[]>;

  errorMessage: string;
  profile: Object;
  firebaseRef: any;
  firebaseDB: any;
  uid: string;

  constructor(private authService: AuthService, @Inject(FirebaseApp) firebase: any, private af: AngularFire) {
    this.firebaseRef = firebase.auth();
    this.firebaseDB = firebase.database();
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

  registerUser() {
    let user: string = (<HTMLInputElement>document.getElementById('email')).value;
    let pw: string = (<HTMLInputElement>document.getElementById('password')).value;
    let userRef = this.users;
    this.firebaseRef.createUserWithEmailAndPassword(user,pw)
                    .then(function(response) {
                      console.log(response.uid);
                      let newUser: User = new User();
                      newUser.uid = response.uid;
                      newUser.role = "User";
                      userRef.push(newUser);
                    })
                    .catch(error => console.log(error.message));

  }

}
