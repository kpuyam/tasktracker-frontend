import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './main/main.models';
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
    return this.http.get<any>(`${this.baseUrl}/user_details`, { headers });
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects/`, projectData);
  }
  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks/`, taskData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { params });
  }

  getTasksByStatusNotCompleted(): Observable<Task[]> {
    const params = new HttpParams().set('status__not', 'completed');
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { params });
  }
}
