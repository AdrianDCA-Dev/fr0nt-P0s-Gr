/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from './auth/services/interceptors/jwt-interceptor';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NbAuthModule} from './auth/auth.module';
import {AuthGuard} from './auth-guard.service';
import {NbEmailPassAuthProvider} from './auth/providers/email-pass-auth.provider';
import {NbAuthJWTToken} from './auth/services/token.service';
import {NB_AUTH_TOKEN_WRAPPER_TOKEN} from './auth/auth.options';
import {RolePermissionService} from './services/role-permission/role-permission.service';
import {PersonService} from './services/person/person.service';
import {UserService} from './services/user/user.service';
import {TypeAcademicProgramService} from './services/type-academic-program/type-academic-program.service';
import {AcademicProgramService} from './services/academic-program/academic-program.service';
import {ModuleService} from './services/module/module.service';
import {CronogramaService} from './services/cronograma/cronograma.service';
import {ContentService} from './services/content/content.service';
import {ToasterService} from 'angular2-toaster';
import {InscriptionService} from './services/inscription/inscription.service';
import {EvaluationCriteriaService} from './services/evaluation-criteria/evaluation-criteria.service';
import {PlanClaseService} from './services/plan-clase/plan-clase.service';
import {CampoIndicadoresService} from './services/campo-indicadores/campo-indicadores.service';
import { HoraIgualDirective } from './directives/hora-igual/hora-igual.directive';
import {EvaluationService} from './services/evaluation/evaluation.service';
import { EstadoBoolDirective } from './directives/estado-bool/estado-bool.directive';
import {AclService} from "ng2-acl";
import {EvaluationDocenteService} from "./services/evaluation-docente/evaluation-docente.service";
import {EvaluationAdminDocenteService} from "./services/evaluation-admin-docente/evaluation-admin-docente.service";
import {QuizService} from "./services/quiz/quiz.service";

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [AppComponent, HoraIgualDirective, EstadoBoolDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
          },
        },
      },
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [ AuthGuard, RolePermissionService, PersonService, UserService, TypeAcademicProgramService, AcademicProgramService,
    ModuleService, CronogramaService, ContentService, ToasterService, InscriptionService, EvaluationCriteriaService,
    CampoIndicadoresService, EvaluationService, AclService,
    EvaluationDocenteService, EvaluationAdminDocenteService, QuizService,
  { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
  { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
  /*{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true, },*/
  /*{ provide: APP_BASE_HREF, useValue: '/' },*/
  ],
})
export class AppModule {
}
