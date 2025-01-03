import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChainLaboratories } from '../interfaces/i-chain-laboratories';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SChainLaboratoriesService {
  constructor(private _HttpClient: HttpClient) {}
  getChainLaboratories(): Observable<IChainLaboratories[]> {
    return this._HttpClient.get<IChainLaboratories[]>(
      `${environment.baseUrl}/Chain_Laboratories`
    );
  }
  addChainLaboratories(
    chainLaboratories: IChainLaboratories
  ): Observable<IChainLaboratories> {
    return this._HttpClient.post<IChainLaboratories>(
      `${environment.baseUrl}/Chain_Laboratories`,
      chainLaboratories,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  showChainLaboratories(id: string): Observable<IChainLaboratories> {
    return this._HttpClient.get<IChainLaboratories>(
      `${environment.baseUrl}/Chain_Laboratories/${id}`
    );
  }
  editChainLaboratories(
    id: string,
    chainLaboratories: IChainLaboratories
  ): Observable<IChainLaboratories> {
    return this._HttpClient.put<IChainLaboratories>(
      `${environment.baseUrl}/Chain_Laboratories/${id}`,
      chainLaboratories,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteChainLaboratories(id: string): Observable<IChainLaboratories> {
    return this._HttpClient.delete<IChainLaboratories>(
      `${environment.baseUrl}/Chain_Laboratories/${id}`,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
}
