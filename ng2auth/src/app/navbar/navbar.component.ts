import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseLoginComponent } from '../firebase-login/firebase-login.component';
import { FirebaseAuth, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ FirebaseLoginComponent ]
})
export class NavbarComponent implements OnInit {

  role: string;
  userEmail: string;

  constructor(public firebaseLogin: FirebaseLoginComponent, public auth: FirebaseAuth, public authService: AuthService) { }

  ngOnInit() { }

  loggedIn() {
    this.role = this.authService.getUserRole();
  }

  passCredentials () {
    let user: string = (<HTMLInputElement>document.getElementById('username')).value;
    let pw: string = (<HTMLInputElement>document.getElementById('password')).value;
    this.authService.login(user, pw);
  }

  getUserEmail() {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail;
  }
}
