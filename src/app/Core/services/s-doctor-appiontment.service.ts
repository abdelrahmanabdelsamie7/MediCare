import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorAppointment } from '../interfaces/i-doctor-appiontment';

@Injectable({
  providedIn: 'root',
})
export class SDoctorAppiontmentService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorAppointments(): Observable<IDoctorAppointment[]> {
    return this._HttpClient.get<IDoctorAppointment[]>(
      `${environment.baseUrl}/Appointments`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  addDoctorAppointment(
    doctorAppointment: IDoctorAppointment
  ): Observable<IDoctorAppointment> {
    return this._HttpClient.post<IDoctorAppointment>(
      `${environment.baseUrl}/Appointments`,
      doctorAppointment,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  showDoctorAppointment(id: string): Observable<IDoctorAppointment> {
    return this._HttpClient.get<IDoctorAppointment>(
      `${environment.baseUrl}/Appointments/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  editDoctorAppointment(
    id: string,
    doctorAppointment: IDoctorAppointment
  ): Observable<IDoctorAppointment> {
    return this._HttpClient.put<IDoctorAppointment>(
      `${environment.baseUrl}/Appointments/${id}`,
      doctorAppointment,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  deleteDoctorAppointment(id: string): Observable<IDoctorAppointment> {
    return this._HttpClient.delete<IDoctorAppointment>(
      `${environment.baseUrl}/Appointments/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
}
