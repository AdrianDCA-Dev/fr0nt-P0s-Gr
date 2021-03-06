import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate : [AuthGuard],
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
