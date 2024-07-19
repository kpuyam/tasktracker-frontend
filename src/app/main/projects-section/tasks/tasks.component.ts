import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  project: any;
  tasks: any[] = [];
  users: any = {};

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getProject(projectId).subscribe((project: any) => {
      this.project = project;
    });

    this.apiService.getTasks(projectId).subscribe((data: any[]) => {
      this.tasks = data;
    });

    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
    });
  }

  getUserName(userId: number): string {
    return this.users[userId] || 'Unknown';
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
