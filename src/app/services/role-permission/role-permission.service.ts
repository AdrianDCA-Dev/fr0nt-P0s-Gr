import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class RolePermissionService {

  constructor(private http: HttpClient) { }

  getPermission(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/permission`);
  }

  getRole(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/role`);
  }

  postRolePermission(role: any): Observable<any> {
    return this.http.post(`${environment.api_url}/role`, role);
  }

  putRolePermission(id: any, role: any): Observable<any> {
    return this.http.put(`${environment.api_url}/role/` + id, role);
  }

  deleteRole(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/role/` + id);
  }
}
