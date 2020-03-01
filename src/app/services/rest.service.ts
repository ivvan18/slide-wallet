import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private restUrl = environment.restUrl;

  constructor(private http: HttpClient) { }

  getEntities(entities: string, params?: any): Observable<any> {
    return this.http.get(this.restUrl + `/${entities}`, { params: params });
  }

  getEntityById(entity: string, id: number): Observable<any> {
    return this.http.get(this.restUrl + `/${entity}/${id}`);
  }

  postEntity(entity: string, body: any): Observable<any> {
    return this.http.post(this.restUrl + `/${entity}`, body);
  }

  deleteEntity(entity: string, body: any): Observable<any> {
    console.log(body);
    return this.http.delete(this.restUrl + `/${entity}`, {params: body});
  }
}
