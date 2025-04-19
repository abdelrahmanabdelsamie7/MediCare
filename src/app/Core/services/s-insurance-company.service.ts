import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceCompany } from '../interfaces/insurance-company';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SInsuranceCompanyService {
  constructor(private _HttpClient: HttpClient) { }
  getInsuranceCompanies(): Observable<InsuranceCompany[]> {
    return this._HttpClient.get<InsuranceCompany[]>(
      `${environment.baseUrl}/insurance-companies`
    );
  }
  addInsuranceCompany(insuranceCompany: InsuranceCompany): Observable<InsuranceCompany> {
    return this._HttpClient.post<InsuranceCompany>(
      `${environment.baseUrl}/insurance-companies`,
      insuranceCompany,

    );
  }
  showInsuranceCompany(id: string): Observable<InsuranceCompany> {
    return this._HttpClient.get<InsuranceCompany>(
      `${environment.baseUrl}/insurance-companies/${id}`
    );
  }
  editInsuranceCompany(id: string, insuranceCompany: InsuranceCompany): Observable<InsuranceCompany> {
    return this._HttpClient.put<InsuranceCompany>(
      `${environment.baseUrl}/insurance-companies/${id}`,
      insuranceCompany,

    );
  }
  deleteInsuranceCompany(id: string): Observable<InsuranceCompany> {
    return this._HttpClient.delete<InsuranceCompany>(
      `${environment.baseUrl}/insurance-companies/${id}`,

    );
  }
}
