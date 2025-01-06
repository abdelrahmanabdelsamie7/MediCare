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

  // Images Of Clinic
  addDoctorClinicImage(
    doctorClinicImage: IDoctorClinicImage
  ): Observable<IDoctorClinicImage> {
    return this._HttpClient.post<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images`,
      doctorClinicImage,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  showDoctorClinicImage(id: string): Observable<IDoctorClinicImage> {
    return this._HttpClient.get<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  editDoctorClinicImage(
    doctorClinicImage: IDoctorClinicImage,
    id: string
  ): Observable<IDoctorClinicImage> {
    return this._HttpClient.put<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      doctorClinicImage,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteDoctorClinicImage(id: string): Observable<IDoctorClinicImage> {
    return this._HttpClient.delete<IDoctorClinicImage>(
      `${environment.baseUrl}/Clinic_Images/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }

  // Add Clinic To Doctor
  addClinicToDoctor(
    doctorClinic: IClinicToDoctor
  ): Observable<IClinicToDoctor> {
    return this._HttpClient.post<IClinicToDoctor>(
      `${environment.baseUrl}/doctor/${doctorClinic.doctor_id}/clinic/${doctorClinic.clinic_id}`,
      doctorClinic,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteClinicOfDoctor(
    doctor_id: string,
    clinic_id: string
  ): Observable<IDoctorClinic> {
    return this._HttpClient.delete<IDoctorClinic>(
      `${environment.baseUrl}/doctor${doctor_id}/clinic/${clinic_id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
}
