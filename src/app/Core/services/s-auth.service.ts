import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { NO_CACHE } from '../interceptors/cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class SAuthService {
  private readonly _HttpClient = inject(HttpClient);
  setRegisterForm(data: IUser): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${environment.baseUrl}/user/register`,
      data
    );
  }
  setLoginForm(data: IUser): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${environment.baseUrl}/user/login`,
      data
    );
  }
  getUserAccount(): Observable<IUser> {
    // bypass caching is bypassed.
    const context = new HttpContext().set(NO_CACHE, true);
    return this._HttpClient.get<IUser>(
      `${environment.baseUrl}/user/getaccount`,
      { context }
    );
  }
}
