import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class TypeAcademicProgramService {

  constructor(private http: HttpClient) { }

  getTypeAcademicProgram(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/type`);
  }

  postTypeAcademicProgram(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/type`, data);
  }

  putTypeAcademicProgram(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/type/` + id, data);
  }

  deleteTypeAcademicProgram(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/type/` + id);
  }
}
