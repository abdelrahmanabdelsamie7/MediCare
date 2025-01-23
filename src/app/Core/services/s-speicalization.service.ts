import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ISpecialization } from '../interfaces/i-specialization';
import { IDoctorSpecialization } from '../interfaces/i-doctor-specialization';
@Injectable({
  providedIn: 'root',
})
export class SSpeicalizationService {
  constructor(private _HttpClient: HttpClient) {}
  getSpecializations(): Observable<ISpecialization[]> {
    return this._HttpClient.get<ISpecialization[]>(
      `${environment.baseUrl}/Specializations`
    );
  }
  addSpecialization(
    specialization: ISpecialization
  ): Observable<ISpecialization> {
    return this._HttpClient.post<ISpecialization>(
      `${environment.baseUrl}/Specializations`,
      specialization,
    
    );
  }
  showSpecialization(id: string): Observable<ISpecialization> {
    return this._HttpClient.get<ISpecialization>(
      `${environment.baseUrl}/Specializations/${id}`
    );
  }
  editSpecialization(
    id: string,
    specialization: ISpecialization
  ): Observable<ISpecialization> {
    return this._HttpClient.put<ISpecialization>(
      `${environment.baseUrl}/Specializations/${id}`,
      specialization,
    
    );
  }
  deleteSpecialization(id: string): Observable<ISpecialization> {
    return this._HttpClient.delete<ISpecialization>(
      `${environment.baseUrl}/Specializations/${id}`,
    
    );
  }
  addSpecializationDoctor(
    doctorSpecialization: IDoctorSpecialization
  ): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/Doctor_Specialization`,
      doctorSpecialization,
    
    );
  }
}
