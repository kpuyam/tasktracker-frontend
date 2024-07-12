import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    });
  }

  showTasks(projectId: number): void {
    this.router.navigate([`/projects/${projectId}/tasks`]);
  }
}
