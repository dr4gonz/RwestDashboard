import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  errorMessage: string;
  profile: Object;
  firebaseRef: any;

  constructor(private authService: AuthService, @Inject(FirebaseApp) firebase: any) {
    this.firebaseRef = firebase.auth();
    console.log(this.firebaseRef);
  }

  ngOnInit() {
  }

  registerUser() {
    let user: string = (<HTMLInputElement>document.getElementById('email')).value;
    let pw: string = (<HTMLInputElement>document.getElementById('password')).value;
    this.firebaseRef.createUserWithEmailAndPassword(user,pw)
                    .then(response => console.log(response))
                    .catch(error => console.log(error.message));

  }

}
