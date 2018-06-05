import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {NbAuthService} from './auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      });
  }
}
