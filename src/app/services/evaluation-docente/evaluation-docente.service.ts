import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class EvaluationDocenteService {

  constructor(private http: HttpClient) { }

  getEvaluationDocente(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}/evaluardocente/` + id);
  }

  getCriterioDocente(): Observable<any> {
    return this.http.get<string>(`${environment.api_url}/evaldocentecriterio`);
  }
}
