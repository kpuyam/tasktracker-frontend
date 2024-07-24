import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  myInterval = 100; // Interval for carousel
  activeSlideIndex = 0; // Active slide index
  projects: { name: string; description: string; start_date: string; end_date: string; owner: string; id: number }[] = []; // Array to hold project data
  noWrap = false; // Optional: Set to true if you want the carousel to loop indefinitely
  itemsPerSlide = 6;
  allusers: { [key: number]: string } = {};

  selectedProjectId: number | null = null;

  selectedTasks: any[] = [];
  selectedUsers: { projectOwner: any, teammates: any[] } = { projectOwner: null, teammates: [] };

  @Output() tasks = new EventEmitter<any[]>();

  @Output() users = new EventEmitter<{ projectOwner: any, teammates: any[] }>();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Fetch projects
    this.apiService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;

      // Fetch users
      this.projects.forEach(project => {
        this.apiService.getUserName(project.owner).subscribe((userdetails: any) => {
          project.owner = userdetails.username || 'Unknown';
        });
      });
    });
  }

  redirectToProjectDetails(projectId: number): void {
    this.router.navigate(['projects/', projectId]);
  }

  showTasks(projectId: number): void {
    this.selectedProjectId = projectId;
    this.apiService.getTasksByProject(projectId).subscribe((tasks: any) => {
      let projectTasks = tasks.tasks || [];
      projectTasks.forEach((task: any) => { // Explicitly specify type 'any' for 'task'
        this.apiService.getUserName(task.owner).subscribe((userdetails: any) => {
          task.owner = userdetails.username || 'Unknown';
        });
      });
      this.tasks.emit(projectTasks);
    });

    this.apiService.getUsersByProject(projectId).subscribe((data: any) => {
      this.selectedUsers = {
        projectOwner: data.project_owner,
        teammates: data.users.length> 0 ? data.users : null
      };
      this.users.emit(this.selectedUsers);
    });
  }



}