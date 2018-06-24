/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { UserService } from '../../../services/user/user.service';
import {AclService} from "ng2-acl";

@Component({
  selector: 'ngx-login',
  template: `
    <ngx-auth-block>
      <div class="row">
          <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">
            
              <h2 class="title text-center">INICIAR SESIÓN</h2>
              <small class="form-text sub-title"></small>
            <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
                 class="alert alert-danger" role="alert">
              <div><strong>Error!</strong></div>
              <div *ngFor="let error of errors">{{ error }}</div>
            </div>

            <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
                 class="alert alert-success" role="alert">
              <div><strong>Hooray!</strong></div>
              <div *ngFor="let message of messages">{{ message }}</div>
            </div>

            <div class="form-group row">
              <label for="input-role" class="col-sm-2 col-form-label">Usuario:</label>
              <div class="col-sm-10">
                <select  name="roleid" class="form-control" [(ngModel)]="user.roleid"
                         id="input-roleid" #roleid="ngModel"
                         [class.form-control-danger]="roleid.invalid && roleid.touched" autofocus
                         [required]="getConfigValue('forms.validation.roleid.required')">
                  <option *ngFor="let roles of dataRole" [value]="roles.id">
                    {{roles.name}}
                  </option>
                  <small class="form-text error" *ngIf="roleid.invalid && roleid.touched && roleid.errors?.required">
                    ¡Perfil es requerido!
                  </small>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label for="input-email" class="col-sm-2 col-form-label">Código:</label>
              <div class="col-sm-10">
                <input name="email" [(ngModel)]="user.name" id="input-email"
                       class="form-control" placeholder="Introduzca Numero de Carnet" #email="ngModel"
                       [class.form-control-danger]="email.invalid && email.touched" autofocus
                       [required]="getConfigValue('forms.validation.email.required')">
                <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
                  ¡Numero de Carnet es requerido!
                </small>
              </div>
            </div>

            <div class="form-group row">
              <label for="input-password" class="col-sm-2 col-form-label">Contraseña:</label>
              <div class="col-sm-10">
                <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                       class="form-control" placeholder="Contraseña" #password="ngModel"
                       [class.form-control-danger]="password.invalid && password.touched"
                       [required]="getConfigValue('forms.validation.password.required')"
                       [minlength]="getConfigValue('forms.validation.password.minLength')"
                       [maxlength]="getConfigValue('forms.validation.password.maxLength')">
                <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
                  ¡Se requiere contraseña!
                </small>
                <small
                  class="form-text error"
                  *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
                  La contraseña debe contener
                  de {{ getConfigValue('forms.validation.password.minLength') }}
                  a {{ getConfigValue('forms.validation.password.maxLength') }}
                  los caracteres
                </small>
              </div>
            </div>

            <!-- <div class="form-group accept-group col-sm-12">
               <nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">Remember me</nb-checkbox>
               <a class="forgot-password" routerLink="../request-password">Forgot Password?</a>
             </div>-->
            <div class="form-group row">
              <label class="col-sm-2 col-form-label"></label>
              <div class="col-sm-10">
                <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                        [class.btn-pulse]="submitted">
                  Iniciar Sesión
                </button>
              </div>

            </div>

          </form>
      </div>
     
     <!-- <div class="links">
        <small class="form-text">Or connect with:</small>

        <div class="socials">
          <a href="https://github.com/akveo" target="_blank" class="socicon-github"></a>
          <a href="https://www.facebook.com/akveo/" target="_blank" class="socicon-facebook"></a>
          <a href="https://twitter.com/akveo_inc" target="_blank" class="socicon-twitter"></a>
        </div>

       <!-- <small class="form-text">
          Don't have an account? <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>-->
     <!-- </div> -->
    </ngx-auth-block>
  `,
})
export class NbLoginComponent {

// tslint:disable-next-line:no-inferrable-types
  redirectDelay: number = 0;
  showMessages: any = {};
// tslint:disable-next-line:no-inferrable-types
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
// tslint:disable-next-line:no-inferrable-types
  submitted: boolean = false;
  dataRole: any[];
  data: any;
  constructor(protected service: NbAuthService, private serviceRole: UserService,
              private aclService: AclService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  ngOnInit() {
    this.serviceRole.getRole().subscribe(data => {
      this.dataRole = data.role;
      console.log('role', this.dataRole);
    });
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log('result', result.getResponse().body);
      this.data = result.getResponse();
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        console.log('ENTRO', this.data.body.userRole);
        for (let i = 0; i < this.data.body.userRole.length; i++) {
          console.log('loco', this.data.body.userRole[i]);
          this.aclService.attachRole(this.data.body.userRole[i]);
        }
        this.aclService.setAbilities(this.data.body.abilities);
      } else {
        this.errors = result.getErrors();
        console.log('FALLO');
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
