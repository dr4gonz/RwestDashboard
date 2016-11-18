import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-user',
  outputs: ['hideFormEvent'],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  users: FirebaseListObservable<User[]>;
  submitted = false;
  roles = ['User', 'Admin'];
  hideFormEvent: EventEmitter<any>;
  private firebase: any;

  constructor(private af: AngularFire, @Inject(FirebaseApp) firebase: any) {
    this.hideFormEvent = new EventEmitter();
    this.firebase = firebase;
  }

  ngOnInit() {
  }

  registerUser(em: HTMLInputElement, pw: HTMLInputElement, rl: HTMLInputElement) {
    let firebaseRef = this.firebase.auth();
    let email = em.value;
    let password = pw.value;
    let role = rl.value;
    let evEm = this.hideFormEvent;

    let userRef = this.af.database.list('/users');
    firebaseRef.createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        let newUser: User = new User();
        newUser.uid = response.uid;
        newUser.email = email;
        newUser.role = role;
        userRef.push(newUser);

        // form reset & hide
        em.value = '';
        pw.value = '';
        rl.value = 'User';
        evEm.emit();
      }).catch(error => console.log(error.message));
  }

}
