import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  myInterval = 100; // Interval for carousel
  activeSlideIndex = 0; // Active slide index
  projects: { name: string; description: string; start_date: string; end_date: string; owner: string; id: number }[] = []; // Array to hold project data
  noWrap = false; // Optional: Set to true if you want the carousel to loop indefinitely
  itemsPerSlide = 6;

  selectedProjectId: number | null = null;

  selectedTasks: any[] = [];
  selectedUsers: { projectOwner: any, teammates: any[] } = { projectOwner: null, teammates: [] };

  @Output() tasks = new EventEmitter<any[]>();

  @Output() users = new EventEmitter<{ projectOwner: any, teammates: any[] }>();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;
    });
  }

  redirectToProjectDetails(projectId: number): void {
    this.router.navigate(['projects/', projectId]);
  }

  showTasks(projectId: number): void {
    this.selectedProjectId = projectId;
    this.apiService.getTasks(projectId).subscribe((tasks: any[]) => {
      this.tasks.emit(tasks);

    });
  }

  showTeammates(projectId: number): void {
    this.selectedProjectId = projectId;
    this.apiService.getUsersByProject(projectId).subscribe((data: any) => {
      this.selectedUsers = {
        projectOwner: data.project_owner,
        teammates: data.users.length> 0 ? data.users : null
      };
      this.users.emit(this.selectedUsers);
    });
  }


}
