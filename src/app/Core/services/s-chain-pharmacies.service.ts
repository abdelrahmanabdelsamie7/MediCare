import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChainPharmacies } from '../interfaces/i-chain-pharmacies';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class SChainPharmaciesService {
  constructor(private _HttpClient: HttpClient) {}
  getChainPharmacies(): Observable<IChainPharmacies[]> {
    return this._HttpClient.get<IChainPharmacies[]>(
      `${environment.baseUrl}/Chain_Pharmacies`
    );
  }
  addChainPharmacies(
    chainPharmacies: IChainPharmacies
  ): Observable<IChainPharmacies> {
    return this._HttpClient.post<IChainPharmacies>(
      `${environment.baseUrl}/Chain_Pharmacies`,
      chainPharmacies
    );
  }
  showChainPharmacies(id: string): Observable<IChainPharmacies> {
    return this._HttpClient.get<IChainPharmacies>(
      `${environment.baseUrl}/Chain_Pharmacies/${id}`
    );
  }
  editChainPharmacies(
    id: string,
    chainPharmacies: IChainPharmacies
  ): Observable<IChainPharmacies> {
    return this._HttpClient.put<IChainPharmacies>(
      `${environment.baseUrl}/Chain_Pharmacies/${id}`,
      chainPharmacies
    );
  }
  deleteChainPharmacies(id: string): Observable<IChainPharmacies> {
    return this._HttpClient.delete<IChainPharmacies>(
      `${environment.baseUrl}/Chain_Pharmacies/${id}`
    );
  }
}
