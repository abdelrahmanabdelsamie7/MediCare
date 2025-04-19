import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDepartmentTips } from '../interfaces/i-department-tips';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class SDepartmentTipsService {
  public departmentTips = new BehaviorSubject<IDepartmentTips[]>([]);
  public items$ = this.departmentTips.asObservable();
  constructor(private _HttpClient: HttpClient) {}
  getDepartmentTips(): Observable<IDepartmentTips[]> {
    return this._HttpClient
      .get<IDepartmentTips[]>(`${environment.baseUrl}/Tips`)
      .pipe(
        tap((response: any) => {
          if (response.success && response.data) {
            this.departmentTips.next(response.data);
          }
        }),
        map((response) => response.data)
      );
  }
  addDepartmentTip(
    departmentTip: IDepartmentTips
  ): Observable<IDepartmentTips> {
    return this._HttpClient
      .post<IDepartmentTips>(`${environment.baseUrl}/Tips`, departmentTip)
      .pipe(
        tap((response: any) => {
          let currentTips = this.departmentTips.getValue();
          let addedTip = response.data;
          this.departmentTips.next([...currentTips, addedTip]);
        })
      );
  }
  showDepartmentTip(id: string): Observable<IDepartmentTips> {
    return this._HttpClient.get<IDepartmentTips>(
      `${environment.baseUrl}/Tips/${id}`
    );
  }
  editDepartmentTip(
    id: string,
    departmentTip: IDepartmentTips
  ): Observable<IDepartmentTips> {
    return this._HttpClient.put<IDepartmentTips>(
      `${environment.baseUrl}/Tips/${id}`,
      departmentTip
    );
  }
  deleteDepartmentTip(id: string): Observable<IDepartmentTips> {
    return this._HttpClient.delete<IDepartmentTips>(
      `${environment.baseUrl}/Tips/${id}`
    );
  }
}
