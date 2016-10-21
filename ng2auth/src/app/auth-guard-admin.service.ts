import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { FirebaseAuth } from 'angularfire2';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private auth: FirebaseAuth, private router: Router) {}

  canActivate() {
    if (!this.auth) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
