// src/app/interceptors/auth.interceptor.ts
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    return next.handle(
      token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req
    );
  }
}
