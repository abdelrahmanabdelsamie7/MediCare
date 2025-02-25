import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IAi } from '../interfaces/i-ai';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SAiService {
  private laravelApiUrl = `${environment.baseUrl}/ai-analysis`;

  constructor(private http: HttpClient) {}

  analyzeTextAndImage(text: string , file: File | null): Observable<IAi> {
    const formData = new FormData();
    if (text) {
      formData.append('text', text);
    }
    if (file) {
      formData.append('image', file);
    }

    return this.http.post<IAi>(this.laravelApiUrl, formData);
  }
  searchDepartments(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<any>(`${environment.baseUrl}/Departments`, { params }).pipe(
      map(response => response.data.data)
    );
  }
}
