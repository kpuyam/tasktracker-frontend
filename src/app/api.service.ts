import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  private User: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  updateProject(projectId: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${projectId}/`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${projectId}/`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects/`, projectData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks/`, task);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tasks/${taskId}/`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${taskId}/`);
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsersByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users_by_project/${projectId}`);
  }

}
