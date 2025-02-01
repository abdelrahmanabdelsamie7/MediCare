import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartment } from '../interfaces/i-department';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class SDepartmentService {
  constructor(private _HttpClient: HttpClient) {}
  getDepartments(): Observable<IDepartment[]> {
    return this._HttpClient.get<IDepartment[]>(
      `${environment.baseUrl}/Departments`
    );
  }
  getDepartmentData(
    id: string,
    page: number = 1,
    type: string = 'doctors'
  ): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/Departments/${id}?filter=${type}&page=${page}`
    );
  }
  addDepartment(department: IDepartment): Observable<IDepartment> {
    return this._HttpClient.post<IDepartment>(
      `${environment.baseUrl}/Departments`,
      department
    );
  }
  showDepartment(id: string): Observable<IDepartment> {
    return this._HttpClient.get<IDepartment>(
      `${environment.baseUrl}/Departments/${id}`
    );
  }
  editDepartment(id: string, department: IDepartment): Observable<IDepartment> {
    return this._HttpClient.put<IDepartment>(
      `${environment.baseUrl}/Departments/${id}`,
      department
    );
  }
  deleteDepartment(id: string): Observable<IDepartment> {
    return this._HttpClient.delete<IDepartment>(
      `${environment.baseUrl}/Departments/${id}`
    );
  }
}
