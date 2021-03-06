import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient) { }

  getProgramModule(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/evalestudiantepromodule/` + id);
  }

  getModuleEval(idp: any, idpa: any): Observable<any> {
    return this.http.get(`${environment.api_url}/evalmodulestudiante/${idp}/${idpa}`);
  }

  getEvalCriterio(idp: any, idm: any): Observable<any> {
    return this.http.get(`${environment.api_url}/evalestudiantecriterio/${idp}/${idm}`);
  }

  getDetalleEstudiante(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/detalleestudiante/` + id);
  }

  postDetalleEvalucion(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/evaluacionestudiante`, data);
  }
}

