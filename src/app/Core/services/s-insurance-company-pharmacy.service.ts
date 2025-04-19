import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceCompanyPharmacy } from '../interfaces/insurance-company-pharmacy';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SInsuranceCompanyPharmacyService {
  constructor(private _HttpClient: HttpClient) { }
  addInsuranceCompanyToPharmacy(insuranceCompanyPharmacy: InsuranceCompanyPharmacy): Observable<InsuranceCompanyPharmacy> {
    return this._HttpClient.post<InsuranceCompanyPharmacy>(
      `${environment.baseUrl}/insurance-companies-pharmacy`,
      insuranceCompanyPharmacy,

    );
  }
  removeInsuranceCompayFromPharmacy(id: string): Observable<void> {
    return this._HttpClient.delete<void>(
      `${environment.baseUrl}/insurance-companies-pharmacy/${id}`
    );
  }
}
