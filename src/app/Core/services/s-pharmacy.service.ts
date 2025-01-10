import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPharmacy } from '../interfaces/i-pharmacy';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserPharmacy } from '../interfaces/i-user-pharmacy';
@Injectable({
  providedIn: 'root',
})
export class SPharmacyService {
  constructor(private _HttpClient: HttpClient) {}
  getPharmacies(): Observable<IPharmacy[]> {
    return this._HttpClient.get<IPharmacy[]>(
      `${environment.baseUrl}/Pharmacies`
    );
  }
  addPharmacy(pharmacy: IPharmacy): Observable<IPharmacy> {
    return this._HttpClient.post<IPharmacy>(
      `${environment.baseUrl}/Pharmacies`,
      pharmacy,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
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
      pharmacy,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deletePharmacy(id: string): Observable<IPharmacy> {
    return this._HttpClient.delete<IPharmacy>(
      `${environment.baseUrl}/Pharmacies/${id}`,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }

  // Rating Pharmacy
  ratePharmacy(rateValue: IUserPharmacy): Observable<IUserPharmacy> {
    return this._HttpClient.post<IUserPharmacy>(
      `${environment.baseUrl}/User_Pharmacy`,
      rateValue,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('userToken'),
        },
      }
    );
  }
  ratesOfPharmacy(): Observable<IUserPharmacy> {
    return this._HttpClient.get<IUserPharmacy>(
      `${environment.baseUrl}/User_Pharmacy`
    );
  }
}
