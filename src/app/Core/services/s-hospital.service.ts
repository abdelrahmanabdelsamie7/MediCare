import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHospital } from '../interfaces/ihospital';
import { environment } from '../../../environments/environment.development';
import { IDepartmentHospital } from '../interfaces/i-department-hospital';
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
      hospital,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
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
      hospital,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteHospital(id: string): Observable<IHospital> {
    return this._HttpClient.delete<IHospital>(
      `${environment.baseUrl}/Hospitals/${id}`,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  addDepartmentHospital(
    departmentHospital: IDepartmentHospital
  ): Observable<IDepartmentHospital> {
    return this._HttpClient.post<IDepartmentHospital>(
      `${environment.baseUrl}/Department_Hospital`,
      departmentHospital,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  editDepartmentHospital(
    department_id: string,
    hospital_id: string,
    departmentHospital: IDepartmentHospital
  ): Observable<IDepartmentHospital> {
    return this._HttpClient.put<IDepartmentHospital>(
      `${environment.baseUrl}/Department_Hospital/${department_id}/${hospital_id}`,
      departmentHospital,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
}
