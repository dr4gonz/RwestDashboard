import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock('UPewrAsrOxeHQ4kxeUcBodCS2a7f0xwe', 'carlegbert.auth0.com');

  constructor(private router: Router, private http: Http) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
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
    if (this.loggedIn()) {
      return (JSON.parse(localStorage.getItem('profile')).roles[0] === "admin");
    } else {
      return false;
    }
  }

}
