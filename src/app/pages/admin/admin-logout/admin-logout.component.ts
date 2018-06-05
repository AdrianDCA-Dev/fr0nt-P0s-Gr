import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthResult } from '../../../auth/services/auth.service';

@Component({
  selector: 'ngx-admin-logout',
  template: `
    <div>Logging out, please wait...</div>
  `,
})
export class AdminLogoutComponent implements OnInit {

  redirectDelay: number = 1500;

  constructor(protected service: NbAuthService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.logout('email');
  }

  logout(provider: string): void {
    this.service.logout(provider).subscribe((result: NbAuthResult) => {
      this.router.navigate(['/auth/login']);
    /*  console.log('result', result);
      const redirect = result.getRedirect();
      console.log('redirect', redirect);
      if (redirect) {
        setTimeout(() => {
          return this.router.navigate(['login']);
        }, this.redirectDelay);
      }*/
    });
  }

}
