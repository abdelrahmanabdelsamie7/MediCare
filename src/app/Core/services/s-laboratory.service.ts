import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILaboratory } from '../interfaces/i-laboratory';
import { environment } from '../../../environments/environment.development';
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
      laboratory
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
      laboratory
    );
  }
  deleteLaboratory(id: string): Observable<ILaboratory> {
    return this._HttpClient.delete<ILaboratory>(
      `${environment.baseUrl}/Laboratories/${id}`
    );
  }
}
