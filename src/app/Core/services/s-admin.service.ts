import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IAdmin } from '../interfaces/i-admin';

@Injectable({
  providedIn: 'root',
})
export class SAdminService {
  constructor(private _HttpClient: HttpClient) { }
  adminLogin(admin: IAdmin): Observable<IAdmin> {
    return this._HttpClient.post<IAdmin>(
      `${environment.baseUrl}/admin/login`,
      admin
    );
  }
  adminAccount(): Observable<IAdmin> {
    return this._HttpClient
      .get<IAdmin>(`${environment.baseUrl}/admin/getaccount`)
      .pipe(
        tap((data) => { }),
        catchError((err) => {
          console.error('Error fetching data:', err); // تحقق من وجود أخطاء
          return throwError(() => err);
        })
      );
  }
  getStatisticsInfo(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.baseUrl}/statistics`);
  }
}
