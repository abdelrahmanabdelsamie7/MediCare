import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private headers = new HttpHeaders({ 'Skip-Loading': 'true' });

  constructor(private http: HttpClient) {}

  analyzePrescription(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post(`${environment.baseUrl}/analyze/prescription`, formData, { headers: this.headers }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getMedicineDetails(name: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/medicine-details/${encodeURIComponent(name)}`, { headers: this.headers }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
