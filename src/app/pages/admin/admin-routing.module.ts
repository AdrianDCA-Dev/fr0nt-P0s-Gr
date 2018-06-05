import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRolePermissionComponent } from './admin-role-permission/admin-role-permission.component';
import {AdminPersonComponent} from './admin-person/admin-person.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminTypeAcademicProgramComponent} from './admin-type-academic-program/admin-type-academic-program.component';
import {AdminAcademicProgramComponent} from './admin-academic-program/admin-academic-program.component';
import {AdminModuleComponent} from './admin-module/admin-module.component';
import {AdminCronogramaComponent} from './admin-cronograma/admin-cronograma.component';
import {AdminContentComponent} from './admin-content/admin-content.component';
import {AdminTimePickerComponent} from './admin-time-picker/admin-time-picker.component';
import {AdminInscriptionComponent} from './admin-inscription/admin-inscription.component';
import {AdminEvaluationCriteriaComponent} from './admin-evaluation-criteria/admin-evaluation-criteria.component';
import {AdminEvaluationComponent} from './admin-evaluation/admin-evaluation.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminCampoIndicadoresComponent } from './admin-campo-indicadores/admin-campo-indicadores.component';
import { AdminAdminTeacherComponent } from './admin-admin-teacher/admin-admin-teacher.component';
import { AdminTeacherComponent } from './admin-teacher/admin-teacher.component';
import { AdminStudentComponent } from './admin-student/admin-student.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
  {
    path: 'admin-role-permission',
    component: AdminRolePermissionComponent,
  },
  {
    path: 'admin-person',
    component: AdminPersonComponent,
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
  },
  {
    path: 'admin-type-academic-program',
    component: AdminTypeAcademicProgramComponent,
  },
  {
    path: 'admin-academic-program',
    component: AdminAcademicProgramComponent,
  },
  {
    path: 'admin-module',
    component: AdminModuleComponent,
  },
  {
    path: 'admin-content',
    component: AdminContentComponent,
  },
  {
    path: 'admin-cronograma',
    component: AdminCronogramaComponent,
  },
  {
    path: 'admin-inscription',
    component: AdminInscriptionComponent,
  },
  {
    path: 'admin-evaluation-criteria',
    component: AdminEvaluationCriteriaComponent,
  },
  {
    path: 'admin-evaluation',
    component: AdminEvaluationComponent,
  },
  {
    path: 'admin-logout',
    component: AdminLogoutComponent,
  },
  {
    path: 'admin-campo-indicadores',
    component: AdminCampoIndicadoresComponent,
  },
  {
    path: 'admin-admin-teacher',
    component: AdminAdminTeacherComponent,
  },
  {
    path: 'admin-teacher',
    component: AdminTeacherComponent,
  },
  {
    path: 'admin-student',
    component: AdminStudentComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  AdminRolePermissionComponent,
  AdminPersonComponent,
  AdminUsersComponent,
  AdminTypeAcademicProgramComponent,
  AdminAcademicProgramComponent,
  AdminContentComponent,
  AdminModuleComponent,
  AdminCronogramaComponent,
  AdminTimePickerComponent,
  AdminInscriptionComponent,
  AdminEvaluationCriteriaComponent,
  AdminEvaluationComponent,
  AdminLogoutComponent,
  AdminCampoIndicadoresComponent,
  AdminAdminTeacherComponent,
  AdminTeacherComponent,
  AdminStudentComponent,
];
