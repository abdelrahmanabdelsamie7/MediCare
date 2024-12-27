import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICareCenter } from '../interfaces/i-care-center';
import { IDepartmentCareCenter } from '../interfaces/i-department-care-center';
@Injectable({
  providedIn: 'root',
})
export class SCareCenterService {
  constructor(private _HttpClient: HttpClient) {}
  getCareCenters(): Observable<ICareCenter[]> {
    return this._HttpClient.get<ICareCenter[]>(
      `${environment.baseUrl}/CareCenters`
    );
  }
  addCareCenter(careCenter: ICareCenter): Observable<ICareCenter> {
    return this._HttpClient.post<ICareCenter>(
      `${environment.baseUrl}/CareCenters`,
      careCenter
    );
  }
  showCareCenter(id: string): Observable<ICareCenter> {
    return this._HttpClient.get<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`
    );
  }
  editCareCenter(id: string, careCenter: ICareCenter): Observable<ICareCenter> {
    return this._HttpClient.put<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`,
      careCenter
    );
  }
  deleteCareCenter(id: string): Observable<ICareCenter> {
    return this._HttpClient.delete<ICareCenter>(
      `${environment.baseUrl}/CareCenters/${id}`
    );
  }
  addDepartmentCareCenter(
    departmentCareCenetr: IDepartmentCareCenter
  ): Observable<IDepartmentCareCenter> {
    return this._HttpClient.post<IDepartmentCareCenter>(
      `${environment.baseUrl}/CareCenter_Department`,
      departmentCareCenetr
    );
  }
  editDepartmentCareCenter(
    department_id: string,
    care_center_id: string,
    departmentCareCenter: IDepartmentCareCenter
  ): Observable<IDepartmentCareCenter> {
    return this._HttpClient.put<IDepartmentCareCenter>(
      `${environment.baseUrl}/CareCenter_Department/${department_id}/${care_center_id}`,
      departmentCareCenter
    );
  }
}
