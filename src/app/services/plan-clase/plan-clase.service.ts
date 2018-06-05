import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class PlanClaseService {

  constructor(private http: HttpClient) { }

  getPlanClases(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/planclase`);
  }

  postPlanClases(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/planclase`, data);
  }

  putPlanClases(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/planclase/` + id, data);
  }

  deletePlanClases(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/planclase/` + id);
  }
}
