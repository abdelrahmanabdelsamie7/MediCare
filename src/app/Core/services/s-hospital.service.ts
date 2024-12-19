import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHospital } from '../interfaces/ihospital';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class SHospitalService {
  constructor(private _HttpClient: HttpClient) {}
  getHospitals(): Observable<IHospital[]> {
    return this._HttpClient.get<IHospital[]>(
      `${environment.baseUrl}/Hospitals`
    );
  }
  addHospital(hospital: IHospital): Observable<IHospital> {
    return this._HttpClient.post<IHospital>(
      `${environment.baseUrl}/Hospitals`,
      hospital
    );
  }
  showHospital(id: string): Observable<IHospital> {
    return this._HttpClient.get<IHospital>(
      `${environment.baseUrl}/Hospitals/${id}`
    );
  }
  editHospital(id: string, hospital: IHospital): Observable<IHospital> {
    return this._HttpClient.put<IHospital>(
      `${environment.baseUrl}/Hospitals/${id}`,
      hospital
    );
  }
  deleteHospital(id: string): Observable<IHospital> {
    return this._HttpClient.delete<IHospital>(
      `${environment.baseUrl}/Hospitals/${id}`
    );
  }
}
