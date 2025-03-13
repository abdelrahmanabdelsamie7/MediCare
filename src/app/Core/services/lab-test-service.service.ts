import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {
  private headers = new HttpHeaders({ 'Skip-Loading': 'true' });

  constructor(private http: HttpClient) {}

  analyzeLabTest(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.baseUrl}/lab-test-analyzer`, formData, { headers: this.headers });
  }
}
