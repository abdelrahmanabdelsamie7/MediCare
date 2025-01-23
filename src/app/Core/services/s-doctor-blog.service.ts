import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorBlog } from '../interfaces/i-doctor-blog';

@Injectable({
  providedIn: 'root',
})
export class SDoctorBlogService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorBlogs(): Observable<IDoctorBlog[]> {
    return this._HttpClient.get<IDoctorBlog[]>(`${environment.baseUrl}/Blogs`);
  }
  addDoctorBlog(doctorBlog: IDoctorBlog): Observable<IDoctorBlog> {
    return this._HttpClient.post<IDoctorBlog>(
      `${environment.baseUrl}/Blogs`,
      doctorBlog
    );
  }
  showDoctorBlog(id: string): Observable<IDoctorBlog> {
    return this._HttpClient.get<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`
    );
  }
  editDoctorBlog(id: string, doctorBlog: IDoctorBlog): Observable<IDoctorBlog> {
    return this._HttpClient.put<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`,
      doctorBlog
    );
  }
  deleteDoctorBlog(id: string): Observable<IDoctorBlog> {
    return this._HttpClient.delete<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`
    );
  }
  getWebBlogs(): Observable<IDoctorBlog[]> {
    return this._HttpClient.get<IDoctorBlog[]>(
      `${environment.baseUrl}/Blogs_Web`
    );
  }
}
