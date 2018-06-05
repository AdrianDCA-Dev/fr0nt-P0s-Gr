import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) { }

  getPerson(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}`);
  }

  postPerson(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/persona`, data);
  }

  putPerson(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/persona/` + id, data);
  }

  deletePerson(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/persona/` + id);
  }
}

