import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  users: any = {};

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    });

    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
    });
  }

  showTasks(projectId: number): void {
    this.router.navigate([`/projects/${projectId}/tasks`]);
  }

  getUserName(userId: number): string {
    return this.users[userId] || 'Unknown';
  }

  trackByProjectId(index: number, project: any): number {
    return project.id;
  }

  navigateToAddProject(): void {
    this.router.navigate(['/new-project']);
  }
}
