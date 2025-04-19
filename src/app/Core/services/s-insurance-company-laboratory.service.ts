import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { InsuranceCompanyLaboratory } from '../interfaces/insurance-company-laboratory';

@Injectable({
  providedIn: 'root'
})
export class SInsuranceCompanyLaboratoryService {
  constructor(private _HttpClient: HttpClient) { }
  addInsuranceCompanyToLaboratory(insuranceCompanyLaboratoInsuranceCompanyLaboratory: InsuranceCompanyLaboratory): Observable<InsuranceCompanyLaboratory> {
    return this._HttpClient.post<InsuranceCompanyLaboratory>(
      `${environment.baseUrl}/insurance-companies-laboratory`,
      insuranceCompanyLaboratoInsuranceCompanyLaboratory,

    );
  }
  removeInsuranceCompayFromLaboratory(id: string): Observable<void> {
    return this._HttpClient.delete<void>(
      `${environment.baseUrl}/insurance-companies-laboratory/${id}`
    );
  }
}
