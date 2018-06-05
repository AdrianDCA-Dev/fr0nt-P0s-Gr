import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/user`);
  }

  postUsers(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/user`, data);
  }

  putUsers(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/user/` + id, data);
  }

  putEstado(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/abil/` + id, data);
  }

  deleteUsers(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/user/` + id);
  }

  getRoles(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/role`);
  }

  getRole(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/role`);
  }
}
