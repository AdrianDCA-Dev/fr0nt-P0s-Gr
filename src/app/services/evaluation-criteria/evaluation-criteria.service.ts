import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class EvaluationCriteriaService {

  constructor(private http: HttpClient) { }

  getEvaluationCriteria(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/criterioevaluacion`);
  }

  postEvaluationCriteria(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/criterioevaluacion`, data);
  }

  putEvaluationCriteria(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/criterioevaluacion/` + id, data);
  }

  deleteEvaluationCriteria(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/criterioevaluacion/` + id);
  }

}
