import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})

export class FirebaseLoginComponent implements OnInit {
  loggedIn: boolean = false;
  emailBool: boolean = false;
  constructor(public af: AngularFire, public auth: FirebaseAuth) {
    this.af.auth.subscribe(auth => console.log(auth));
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(response => this.loggedIn = true)
      .catch(error => alert(error.message))

    if(this.emailBool) {
      this.emailBool = false;
    }
  }

  logout() {
    this.loggedIn = false;
    this.af.auth.logout();
  }

  overrideLogin() {
    this.emailBool = false;
    this.af.auth.login({
      email: (<HTMLInputElement>document.getElementById('username')).value,
      password: (<HTMLInputElement>document.getElementById('password')).value
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(response => this.loggedIn = true)
      .catch(error => alert(error.message))
  }

  emailLogin() {
    this.emailBool = true;
  }

  ngOnInit() {
  }


}
