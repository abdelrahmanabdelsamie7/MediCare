import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorClinic } from '../interfaces/i-doctor-clinic';
import { IDoctorClinicImage } from '../interfaces/i-doctor-clinic-image';
import { IClinicToDoctor } from '../interfaces/i-clinic-to-dcotor';
@Injectable({
  providedIn: 'root',
})
export class SDoctorClinicService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorClinics(): Observable<IDoctorClinic[]> {
    return this._HttpClient.get<IDoctorClinic[]>(
      `${environment.baseUrl}/Clinics`,
      
    );
  }
  addDoctorClinic(doctorClinic: IDoctorClinic): Observable<IDoctorClinic> {
    return this._HttpClient.post<IDoctorClinic>(
      `${environment.baseUrl}/Clinics`,
      doctorClinic,
      
    );
  }
  showDoctorClinic(id: string): Observable<IDoctorClinic> {
    return this._HttpClient.get<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      
    );
  }
  editDoctorClinic(
    id: string,
    doctorClinic: IDoctorClinic
  ): Observable<IDoctorClinic> {
    return this._HttpClient.put<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      doctorClinic,
      
    );
  }
  deleteDoctorClinic(id: string): Observable<IDoctorClinic> {
    return this._HttpClient.delete<IDoctorClinic>(
      `${environment.baseUrl}/Clinics/${id}`,
      
    );
  }

  // Images Of Clinic
  addDoctorClinicImage(
    doctorClinicImage: IDoctorClinicImage
  ): Observable<IDoctorClinicImage> {
    return this._HttpClient.post<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images`,
      doctorClinicImage,
      
    );
  }
  showDoctorClinicImage(id: string): Observable<IDoctorClinicImage> {
    return this._HttpClient.get<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      
    );
  }
  editDoctorClinicImage(
    doctorClinicImage: IDoctorClinicImage,
    id: string
  ): Observable<IDoctorClinicImage> {
    return this._HttpClient.put<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      doctorClinicImage,
      
    );
  }
  deleteDoctorClinicImage(id: string): Observable<IDoctorClinicImage> {
    return this._HttpClient.delete<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      
    );
  }

  // Add Clinic To Doctor
  addClinicToDoctor(
    doctorClinic: IClinicToDoctor
  ): Observable<IClinicToDoctor> {
    return this._HttpClient.post<IClinicToDoctor>(
      `${environment.baseUrl}/doctor/${doctorClinic.doctor_id}/clinic/${doctorClinic.clinic_id}`,
      doctorClinic,
      
    );
  }
  deleteClinicOfDoctor(
    doctor_id: string,
    clinic_id: string
  ): Observable<IDoctorClinic> {
    return this._HttpClient.delete<IDoctorClinic>(
      `${environment.baseUrl}/doctor${doctor_id}/clinic/${clinic_id}`,
      
    );
  }
}
