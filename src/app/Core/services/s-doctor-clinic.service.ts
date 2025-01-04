import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorClinic } from '../interfaces/i-doctor-clinic';
@Injectable({
  providedIn: 'root',
})
export class SDoctorClinicService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorClinics(): Observable<IDoctorClinic[]> {
    return this._HttpClient.get<IDoctorClinic[]>(
      `${environment.baseUrl}/Clinics`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  addDoctorClinic(doctorClinic: IDoctorClinic): Observable<IDoctorClinic> {
    return this._HttpClient.post<IDoctorClinic>(
      `${environment.baseUrl}/Clinics`,
      doctorClinic,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  showDoctorClinic(id: string): Observable<IDoctorClinic> {
    return this._HttpClient.get<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  editDoctorClinic(
    id: string,
    doctorClinic: IDoctorClinic
  ): Observable<IDoctorClinic> {
    return this._HttpClient.put<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      doctorClinic,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteDoctorClinic(id: string): Observable<IDoctorClinic> {
    return this._HttpClient.delete<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
}
