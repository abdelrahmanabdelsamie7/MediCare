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
  // Notifications Of Reservations
  getUserNotifications(userId: string): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/User_Notifications/${userId}`
    );
  }
  // Admin Else Get All Of Users
  getAllUsers(): Observable<IUser[]> {
    return this._HttpClient.get<IUser[]>(
      `${environment.baseUrl}/allusers`
    );
  }
  // Admin Else Get Specific User Info
  getUserById(id: string): Observable<IUser> {
    return this._HttpClient.get<IUser>(
      `${environment.baseUrl}/allusers/${id}`
    );
  }
  // Admin Else Delete Specific User
  removeUser(id: string): Observable<IUser> {
    return this._HttpClient.delete<IUser>(
      `${environment.baseUrl}/allusers/${id}`
    );
  }
}
