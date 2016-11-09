import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Keys } from '../keys';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import { User } from './models/user.model';


@Injectable()
export class AuthService {

  role: string;
  usrLoggedIn: boolean = false;
  errorMessage: string;
  firebase: any;

  constructor(@Inject(FirebaseApp) firebase: any, private router: Router, private http: Http, private af: AngularFire, private auth: FirebaseAuth) {
    this.firebase = firebase;
  }

  login(username: string, password: string) {
    this.errorMessage = "";
    let _that = this;
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
      //save role to localStorage
      let role: string;
      let users = _that.firebase.database().ref("users");
      let userRef = users.ref.orderByChild("uid").equalTo(response.uid).on("child_added", function(snapshot) {
        let userId = snapshot.key;
        let user = _that.firebase.database().ref('users/' + userId).on("value", function(foo) {
          localStorage.setItem('role', role = foo.val().role);
          window.location.reload();
        });
      });
      _that.usrLoggedIn = true;
    })
      .catch(error => this.handleLoginError(error));
    this.router.navigateByUrl('');
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.usrLoggedIn = false;
    this.af.auth.logout();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('');
  }


  loggedIn() {
    return this.usrLoggedIn;
  }

  isAdmin() {
    return (localStorage.getItem('role') == "Admin");
  }

  getUserEmail() {
    return localStorage.getItem('userEmail');
  }
  getUserId() {
    return localStorage.getItem('uid');
  }
  getUserRole() {
    return localStorage.getItem('role');
  }

  handleLoginError(error) {
    console.log(error.message);
    switch (error.code) {
      case "auth/invalid-email":
        this.errorMessage = "Please enter your email address.";
        break;
      case "auth/user-not-found":
        this.errorMessage = "User not found.";
        break;
      case "auth/wrong-password":
        this.errorMessage = "Incorrect password.";
        break;
      default:
        this.errorMessage = "Login failed.";
        break;
    }
  }

}
