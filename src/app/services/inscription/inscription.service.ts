import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class InscriptionService {

  constructor(private http: HttpClient) { }

  getInscription(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/inscripcion`);
  }

  postInscription(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/inscripcion`, data);
  }

  putInscription(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/inscripcion/` + id, data);
  }

  deleteInscription(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/inscripcion/` + id);
  }

  getInscriptionEstudiante(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/estudiante`);
  }

  getInscriptionDetalleCronograma(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/detallecronograma`);
  }
}
