import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class CronogramaService {

  constructor(private http: HttpClient) { }

  getCronograma(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/cronograma`);
  }

  postCronograma(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/cronograma`, data);
  }

  putCronograma(id: any, data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/cronograma/` + id, data);
  }

  deleteCronograma(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/cronograma/` + id);
  }

  getAmbiente(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/ambiente`);
  }

  getDocente(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/docente`);
  }

  getProgramModule(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/programodule/` + id);
  }

  getProgramAcademico(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/programacademico/` + id);
  }

  getDetCrono(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/detmodule/` + id);
  }
}
