import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILaboratory } from '../interfaces/i-laboratory';
import { environment } from '../../../environments/environment.development';
import { IUserLaboratroy } from '../interfaces/i-user-laboratory';
@Injectable({
  providedIn: 'root',
})
export class SLaboratoryService {
  constructor(private _HttpClient: HttpClient) {}
  getLaboratories(): Observable<ILaboratory[]> {
    return this._HttpClient.get<ILaboratory[]>(
      `${environment.baseUrl}/Laboratories`
    );
  }
  addLaboratory(laboratory: ILaboratory): Observable<ILaboratory> {
    return this._HttpClient.post<ILaboratory>(
      `${environment.baseUrl}/Laboratories`,
      laboratory,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  showLaboratory(id: string): Observable<ILaboratory> {
    return this._HttpClient.get<ILaboratory>(
      `${environment.baseUrl}/Laboratories/${id}`
    );
  }
  editLaboratory(id: string, laboratory: ILaboratory): Observable<ILaboratory> {
    return this._HttpClient.put<ILaboratory>(
      `${environment.baseUrl}/Laboratories/${id}`,
      laboratory,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteLaboratory(id: string): Observable<ILaboratory> {
    return this._HttpClient.delete<ILaboratory>(
      `${environment.baseUrl}/Laboratories/${id}`,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }

  // Rating Laboratory
  rateLaboratory(rateValue: IUserLaboratroy): Observable<IUserLaboratroy> {
    return this._HttpClient.post<IUserLaboratroy>(
      `${environment.baseUrl}/User_Laboratory`,
      rateValue,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('userToken'),
        },
      }
    );
  }
}
