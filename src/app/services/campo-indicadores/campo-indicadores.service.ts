import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class CampoIndicadoresService {

  constructor(private http: HttpClient) { }

  getCamInd(): Observable<any> {
    return this.http.get<string[]>(`${environment.api_url}/registercamind`);
  }

  postCamInd(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/registercamind`, data);
  }

  /*putCamInd(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.api_url}/registercamind/` + id, data);
  }

  deleteCamInd(id: any): Observable<any> {
    return this.http.delete(`${environment.api_url}/registercamind/` + id);
  }*/
}
