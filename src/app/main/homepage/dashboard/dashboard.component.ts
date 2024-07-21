import { Component, OnInit } from '@angular/core';
;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  projects: { name: string; description: string; start_date: string; end_date: string; owner: string; id: number }[] = []; // Array to hold project data
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;

  showTasks(projectId: number): void {
    // Implement your logic to show tasks for the selected project
    console.log(`Show tasks for project ID: ${projectId}`);
  }

  showTeammates(projectId: number): void {
    // Implement your logic to show teammates for the selected project
    console.log(`Show teammates for project ID: ${projectId}`);
  }
}