import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
/*import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';*/
import { AuthGuard } from './auth-guard.service';
import {NbAuthComponent} from './auth/components/auth.component';
import {NbLoginComponent} from './auth/components/login/login.component';
import {NbRegisterComponent} from './auth/components/register/register.component';
import {NbLogoutComponent} from './auth/components/logout/logout.component';
import {NbRequestPasswordComponent} from './auth/components/request-password/request-password.component';
import {NbResetPasswordComponent} from './auth/components/reset-password/reset-password.component';
const routes: Routes = [
  { path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
