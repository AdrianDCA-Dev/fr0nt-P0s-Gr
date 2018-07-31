import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class EvaluationAdminDocenteService {

  constructor(private http: HttpClient) { }

  getAmdinDocete(): Observable<any> {
    return this.http.get<string>(`${environment.api_url}/evaluaradmindocente`);
  }

  getIndicadores(): Observable<any> {
    return this.http.get<string>(`${environment.api_url}/listindicadores`);
  }
}
