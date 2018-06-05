import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class DetailEvaluationService {

  constructor(private http: HttpClient) { }

  getDetalleEvaluacion(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/detalleevaluacion`);
  }

}
