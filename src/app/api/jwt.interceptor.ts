import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/services/auth.service';
import {Router} from '@angular/router';

const authPaths = ['/auth/register', '/auth/login', '/password/forgot'];

type AnyHttpEvent =
  | HttpSentEvent
  | HttpHeaderResponse
  | HttpProgressEvent
  | HttpResponse<any>
  | HttpUserEvent<any>
  | any;

export const constructHeader = (token: string) => {
  return { Authorization: 'Bearer ' + token };
};

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  refreshActionCode = 400;

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<AnyHttpEvent> {
    return next.handle(this.addTokenRequest(request)).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === this.refreshActionCode) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter(inProgress => !inProgress),
              take(1),
              switchMap(() => next.handle(this.addTokenRequest(request))),
            );
          }

          return this.refreshAndRetry(request, next);
        }

        return throwError(err);
      }),
    );
  }

  private isHeaderRequired(request: HttpRequest<any>): boolean {
    return (
      request.url.includes(environment.restUrl) &&
      authPaths.every(path => !request.url.includes(path))
    );
  }

  private refreshTokenExpired() {
    this.auth
      .logout()
      .subscribe(() => this.router.navigate(['auth/login']));
  }

  private addTokenRequest(request: HttpRequest<any>): HttpRequest<any> {
    return this.isHeaderRequired(request) && this.auth.accessToken
      ? request.clone({setHeaders: constructHeader(this.auth.accessToken)})
      : request;
  }

  private refreshAndRetry(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(true);

    return this.auth.tokenRefresh().pipe(
      catchError(response => {
        this.refreshTokenInProgress = false;
        this.refreshTokenExpired();

        return throwError(response.error.error);
      }),
      switchMap(() => {
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(false);

        return next.handle(this.addTokenRequest(request));
      }),
    );
  }
}
