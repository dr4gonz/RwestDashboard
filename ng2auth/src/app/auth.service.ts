import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Keys } from '../keys';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import { User } from './models/user.model';


@Injectable()
export class AuthService {

  role: string;
  usrLoggedIn: boolean = false;
  loggedInUser: User;

  constructor(private router: Router, private http: Http, private af: AngularFire, private auth: FirebaseAuth, @Inject(FirebaseApp) firebase: any) { }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(response => this.usrLoggedIn = true)
      .catch(error => alert(error.message))
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.usrLoggedIn = false;
    this.af.auth.logout();

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('');
  }

  overrideLogin(username: string, password: string) {
    let _that = this;
    this.loggedInUser = new User();
    this.af.auth.login({
      email: username,
      password: password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(function(response) {
      console.log(response);
      localStorage.setItem('userEmail', response.auth.email);
      localStorage.setItem('uid', response.uid); //localstorage
    })
      .catch(error => alert(error.message))
  }

  loggedIn() {
    return this.usrLoggedIn;
  }

  isAdmin() {
    return true;
  }

}
