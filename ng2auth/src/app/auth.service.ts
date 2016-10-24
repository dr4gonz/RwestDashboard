import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Keys } from '../keys';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { User } from './models/user.model';


@Injectable()
export class AuthService {

  role: string;
  usrLoggedIn: boolean = false;

  constructor(private router: Router, private http: Http, private af: AngularFire, private auth: FirebaseAuth) { }

  login(username: string, password: string) {
    this.af.auth.login({
      email: username,
      password: password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(function(response) {
      localStorage.setItem('userEmail', response.auth.email);
      localStorage.setItem('uid', response.uid);
    })
      .catch(error => alert(error.message));
    this.router.navigateByUrl('');
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.usrLoggedIn = false;
    this.af.auth.logout();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('uid');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('');
  }


  loggedIn() {
    return this.usrLoggedIn;
  }

  isAdmin() {
    return true;
  }

  getUserEmail() {
    return localStorage.getItem('userEmail');
  }
  getUserId() {
    return localStorage.getItem('uid');
  }

}
