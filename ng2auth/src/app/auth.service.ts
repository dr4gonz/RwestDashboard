import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Keys } from '../keys';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods, defaultFirebase } from 'angularfire2';


@Injectable()
export class AuthService {

  role: string;

  usrLoggedIn: boolean = false;
  emailBool: boolean = false;

  constructor(private router: Router, private http: Http, private af: AngularFire, private auth: FirebaseAuth) {
    this.af.auth.subscribe(auth => console.log(auth));
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(response => this.usrLoggedIn = true)
      .catch(error => alert(error.message))

    if(this.emailBool) {
      this.emailBool = false;
    }
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
    this.emailBool = false;
    this.af.auth.login({
      email: username,
      password: password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(response => this.usrLoggedIn = true)
      .catch(error => alert(error.message))
  }

  emailLogin() {
    this.emailBool = true;
  }

  loggedIn() {
    return this.usrLoggedIn;
  }

  isAdmin() {
    return (this.loggedIn() && this.role === "admin");
  }
  createUser(email: string, password: string) {

    this.af.auth.createUser({
      email: email,
      password: password
    }).then(response => console.log(response))
      .catch(error => console.log(error.message))
  }

}
