import { HttpClient } from '@angular/common/http';
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
  addDepartment(department: IDepartment): Observable<IDepartment> {
    return this._HttpClient.post<IDepartment>(
      `${environment.baseUrl}/Departments`,
      department
    );
  }
}
