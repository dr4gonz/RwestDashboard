import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})

export class FirebaseLoginComponent implements OnInit {

  userEmail: string;
  showLoginForm: boolean = false;

  constructor(public authService: AuthService, public auth: FirebaseAuth) { }

  ngOnInit() { }

  passCredentials () {
    let user: string = (<HTMLInputElement>document.getElementById('username')).value;
    let pw: string = (<HTMLInputElement>document.getElementById('password')).value;
    this.authService.login(user, pw);
    this.toggleLoginForm();
  }

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }
  getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail;
  }

}
