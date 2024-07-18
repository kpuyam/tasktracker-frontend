import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  private User: any;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects/`);
  }

  getProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${projectId}/`);
  }

  getTasks(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/?project=${projectId}`);
  }

  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    return this.http.get<any>(`${this.baseUrl}/user_details/`, { headers });
  }
}
