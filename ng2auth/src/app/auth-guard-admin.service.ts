import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (!this.isAdmin()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  isAdmin() {
    if (JSON.parse(localStorage.getItem('profile')).roles[0] === "admin") {
      return true;
    } else {
      return false;
    }
  }

}
