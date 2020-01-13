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

  getEntities(entities: string): Observable<any> {
    return this.http.get(this.restUrl + `/${entities}`);
  }

  getEntityById(entity: string, id: number): Observable<any> {
    return this.http.get(this.restUrl + `/${entity}/${id}`);
  }
}
