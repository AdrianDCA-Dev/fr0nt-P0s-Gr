import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class AcademicProgramService {

  constructor(private http: HttpClient) { }

  getAcademicProgram(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/program`);
  }

  postAcademicProgram(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/program`, data);
  }

  putAcademicProgram(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/program/` + id, data);
  }

  deleteAcademicProgram(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/program/` + id);
  }

  getTypeActive(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/typeactive`);
  }

  getProgramActive(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/programacademic`);
  }

  getModulos(id: any): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/modulo/` + id);
  }

  getContenidos(id: any): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/content/` + id);
  }
}
