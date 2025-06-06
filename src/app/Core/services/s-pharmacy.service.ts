import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPharmacy } from '../interfaces/i-pharmacy';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserPharmacy } from '../interfaces/i-user-pharmacy';
@Injectable({
  providedIn: 'root',
})
export class SPharmacyService {
  constructor(private _HttpClient: HttpClient) { }
  getPharmacies(params?: HttpParams): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/Pharmacies`, { params }
    );
  }
  addPharmacy(pharmacy: IPharmacy): Observable<IPharmacy> {
    return this._HttpClient.post<IPharmacy>(
      `${environment.baseUrl}/Pharmacies`,
      pharmacy
    );
  }
  showPharmacy(id: string): Observable<IPharmacy> {
    return this._HttpClient.get<IPharmacy>(
      `${environment.baseUrl}/Pharmacies/${id}`
    );
  }
  editPharmacy(id: string, pharmacy: IPharmacy): Observable<IPharmacy> {
    return this._HttpClient.put<IPharmacy>(
      `${environment.baseUrl}/Pharmacies/${id}`,
      pharmacy
    );
  }
  deletePharmacy(id: string): Observable<IPharmacy> {
    return this._HttpClient.delete<IPharmacy>(
      `${environment.baseUrl}/Pharmacies/${id}`
    );
  }

  // Rating Pharmacy
  ratePharmacy(rateValue: IUserPharmacy): Observable<IUserPharmacy> {
    return this._HttpClient.post<IUserPharmacy>(
      `${environment.baseUrl}/User_Pharmacy`,
      rateValue
    );
  }
  ratesOfPharmacy(): Observable<IUserPharmacy> {
    return this._HttpClient.get<IUserPharmacy>(
      `${environment.baseUrl}/User_Pharmacy`
    );
  }
  allRatesPharmacy(): Observable<IUserPharmacy> {
      return this._HttpClient.get<IUserPharmacy>(
        `${environment.baseUrl}/User_Pharmacy`
      );
    }
  adminDeleteRatePharmacy(id: string): Observable<IUserPharmacy> {
    return this._HttpClient.delete<IUserPharmacy>(
      `${environment.baseUrl}/User_Pharmacy/${id}`
    );
  }
}
