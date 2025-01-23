import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor } from '../interfaces/i-doctor';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class SDoctorService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctors(): Observable<IDoctor[]> {
    return this._HttpClient.get<IDoctor[]>(`${environment.baseUrl}/Doctors`);
  }
  addDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this._HttpClient.post<IDoctor>(
      `${environment.baseUrl}/Doctors`,
      doctor
    );
  }
  showDoctor(id: string): Observable<IDoctor> {
    return this._HttpClient.get<IDoctor>(
      `${environment.baseUrl}/Doctors/${id}`
    );
  }
  editDoctor(id: string, doctor: IDoctor): Observable<IDoctor> {
    return this._HttpClient.put<IDoctor>(
      `${environment.baseUrl}/Doctors/${id}`,
      doctor
    );
  }
  deleteDoctor(id: string): Observable<IDoctor> {
    return this._HttpClient.delete<IDoctor>(
      `${environment.baseUrl}/Doctors/${id}`
    );
  }
  // Auth For Doctor
  doctorLogin(doctor: IDoctor): Observable<IDoctor> {
    return this._HttpClient.post<IDoctor>(
      `${environment.baseUrl}/doctor/login`,
      doctor
    );
  }
  doctorAccount(): Observable<IDoctor> {
    return this._HttpClient.get<IDoctor>(
      `${environment.baseUrl}/doctor/getaccount`
    );
  }
}
