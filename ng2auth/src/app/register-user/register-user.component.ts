import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  users: FirebaseListObservable<User[]>;
  firebaseRef: any;
  firebaseDB: any;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebase: any) {
    this.firebaseRef = firebase.auth();
    this.firebaseDB = firebase.database();
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

  registerUser() {
    let email: string = (<HTMLInputElement>document.getElementById('email')).value;
    let password: string = (<HTMLInputElement>document.getElementById('password')).value;
    let userRef = this.users;
    this.firebaseRef.createUserWithEmailAndPassword(email,password)
                    .then(function(response) {
                      let newUser: User = new User();
                      newUser.uid = response.uid;
                      newUser.role = "User";
                      userRef.push(newUser);
                    })
                    .catch(error => console.log(error.message));
  }

}
