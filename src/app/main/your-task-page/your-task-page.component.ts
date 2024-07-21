import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task } from '../main.models';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
@Component({
  selector: 'app-your-task-page',
  templateUrl: './your-task-page.component.html',
  styleUrl: './your-task-page.component.css'
})
export class YourTaskPageComponent {
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private apiService: ApiService,private  dialog:MatDialog) {}

  ngOnInit(): void {
    this.fetchPendingTasks();
    this.fetchCompletedTasks();
    console.log(this.pendingTasks);
    console.log(this.completedTasks);
  }

  fetchPendingTasks(): void {
    this.apiService.getTasksByStatusNotCompleted().subscribe(
      (tasks: Task[]) => {
        this.pendingTasks = tasks;
        console.log("hello",tasks);
      },
      (error) => {
        console.error('Error fetching pending tasks:', error);
      }
    );
  }

  fetchCompletedTasks(): void {
    this.apiService.getTasksByStatus('completed').subscribe(
      (tasks: Task[]) => {
        this.completedTasks = tasks;
        console.log("hello",tasks);
      },
      (error) => {
        console.error('Error fetching completed tasks:', error);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px', // Adjust width as needed
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close if needed
    });
  }

  navigateToAddTask(): void {
    // Implement navigation logic if needed
  }
}
