import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICareCenter } from '../interfaces/i-care-center';
@Injectable({
  providedIn: 'root',
})
export class SCareCenterService {
  constructor(private _HttpClient: HttpClient) {}
  getCareCenters(): Observable<ICareCenter[]> {
    return this._HttpClient.get<ICareCenter[]>(
      `${environment.baseUrl}/CareCenters`
    );
  }
  addCareCenter(careCenter: ICareCenter): Observable<ICareCenter> {
    return this._HttpClient.post<ICareCenter>(
      `${environment.baseUrl}/CareCenters`,
      careCenter
    );
  }
  showCareCenter(id: string): Observable<ICareCenter> {
    return this._HttpClient.get<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`
    );
  }
  editCareCenter(id: string, careCenter: ICareCenter): Observable<ICareCenter> {
    return this._HttpClient.put<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`,
      careCenter
    );
  }
  deleteCareCenter(id: string): Observable<ICareCenter> {
    return this._HttpClient.delete<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`
    );
  }
}
