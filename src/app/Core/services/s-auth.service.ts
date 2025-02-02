import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';

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
    return this._HttpClient.get<IUser>(
      `${environment.baseUrl}/user/getaccount`,
     //no nead for headers here they added in the interceptor 
    );
  }
}
