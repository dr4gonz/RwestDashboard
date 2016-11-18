import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}