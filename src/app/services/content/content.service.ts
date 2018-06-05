import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class ContentService {
  constructor(private http: HttpClient) { }

  getContent(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/contenido`);
  }

  postContent(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/contenido`, data);
  }

  putContent(id: any, data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/contenido/` + id, data);
  }

  deleteContent(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/contenido/` + id);
  }
}
