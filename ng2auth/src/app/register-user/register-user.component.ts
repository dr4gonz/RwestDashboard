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
  submitted = false;
  roles = ['User', 'Admin'];
  firebaseRef: any;
  firebaseDB: any;
  email: string;
  password: string;
  role: string;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebase: any) {
    this.firebaseRef = firebase.auth();
    this.firebaseDB = firebase.database();
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

  registerUser() {
    this.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.password = (<HTMLInputElement>document.getElementById('password')).value;
    this.role = (<HTMLInputElement>document.getElementById('role')).value;
    let userRef = this.users;
    let _that = this;
    this.firebaseRef.createUserWithEmailAndPassword(this.email,this.password)
                    .then(function(response) {
                      let newUser: User = new User();
                      newUser.uid = response.uid;
                      newUser.role = _that.role;
                      userRef.push(newUser);
                      _that.formSubmitted();
                    })
                    .catch(error => console.log(error.message));
  }
  formSubmitted() {
    this.submitted = true;
  }
  formReset() {
    this.email = '';
    (<HTMLInputElement>document.getElementById('email')).value = '';
    this.password = '';
    (<HTMLInputElement>document.getElementById('password')).value = '';
    this.role = this.roles[0];
    this.submitted = false;
  }

}
