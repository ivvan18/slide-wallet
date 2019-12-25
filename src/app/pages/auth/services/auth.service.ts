import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.restUrl;


  constructor(private http: HttpClient) {}

  login(authData: {login: string, password: string}): Observable<any> {
    const copyObject = {
      username: authData.login,
      password: authData.password
    };

    return this.http.post(this.authUrl + '/login', copyObject);
  }

  register(authData: {email: string, password: string}): Observable<any> {
    const copyObject = {
      username: authData.email,
      password: authData.password
    };

    return this.http.post(this.authUrl + '/registration', copyObject);
  }
}
