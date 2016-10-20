import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Keys } from '../keys';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  role: string;
  lock = new Auth0Lock(Keys.Auth0ClientId, Keys.Auth0Domain);

  constructor(private router: Router, private http: Http) {

    if (localStorage.getItem('profile')) {
      this.role = JSON.parse(localStorage.getItem('profile')).roles[0];
    } else {
      this.role = "none";
    }

    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.role = profile.roles[0];
      });

      this.lock.hide();
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  isAdmin() {
    return (this.loggedIn() && this.role === "admin");
  }

}
