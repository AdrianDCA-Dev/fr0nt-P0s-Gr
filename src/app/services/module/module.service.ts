import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient) { }

  getModule(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/module`);
  }

  postModule(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/module`, data);
  }

  putModule(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/module/` + id, data);
  }

  deleteModule(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/module/` + id);
  }

  getModuleActive(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/moduleactive`);
  }

  getContenModule(id: any): Observable<any> {
    return this.http.get<string>(`${environment.api_url}/contenidomodulo/` + id)
  }
}
