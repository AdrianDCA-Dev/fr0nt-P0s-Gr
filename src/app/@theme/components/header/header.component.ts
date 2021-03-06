import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {NbAuthJWTToken} from '../../../auth/services/token.service';
import {NbAuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: {};

  nombres: string;
  userMenu = [{ title: 'Profile' }, { title: 'Log out', link: '/auth/logout' }];

  constructor(private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    /*this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);*/
    this.nombres = this.authService.getUs().persona.nombres + ' ' +
    this.authService.getUs().persona.app + ' ' +
    this.authService.getUs().persona.apm;
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
