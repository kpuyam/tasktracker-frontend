import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task } from '../main.models';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-your-task-page',
  templateUrl: './your-task-page.component.html',
  styleUrls: ['./your-task-page.component.css']
})
export class YourTaskPageComponent implements OnInit {
  users: any[] = [];
  newTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  acceptedTasks: Task[] = [];
  isReadOnly: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasks().subscribe((tasks: Task[]) => {
      this.newTasks = tasks.filter(task => task.status === 'new' || task.status === 'not_started');
      this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
      this.completedTasks = tasks.filter(task => task.status === 'completed');
      this.acceptedTasks = tasks.filter(task => task.status === 'accepted');
      console.log("HIII",this.newTasks);
    });

    // this.fetchTasks();

    // this.apiService.getUsers().subscribe((users: any[]) => {
    //   this.users = users.reduce((acc, user) => {
    //     acc[user.id] = user.username;
    //     return acc;
    //   }, {});
    // });

    // this.checkReadOnlyRole();
  }

  // checkReadOnlyRole(): void {
  //   this.apiService.getUserDetails().subscribe(userDetails => {
  //     const userId = userDetails.id;
  //     this.apiService.getRole(userId).subscribe((role : any) => {
  //       const read_only = role[0].role;

  //       if (read_only == "read_only") {

  //         this.isReadOnly = true;
  //       }
  //     });
  //   });
  // }

  fetchTasks(): void {

    this.apiService.getTasks().subscribe(
      (tasks: Task[]) => {
        console.log(tasks);
        this.newTasks = tasks.filter(task => task.status === 'new' || task.status === 'not_started');
        this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        this.completedTasks = tasks.filter(task => task.status === 'completed');
        this.acceptedTasks = tasks.filter(task => task.status === 'accepted');
        console.log(this.newTasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }



  dropMultiList(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = this.getStatusForContainer(event.container.id);
      this.apiService.updateTaskStatus(task).subscribe(
        response => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
          console.log('Task status updated successfully',response);
          this.fetchTasks(); // Refresh tasks after update
        },
        error => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }

  getStatusForContainer(containerId: string): string {
    switch (containerId) {
      case 'newTasks':
        return 'new'; // 'new' status represents both 'new' and 'not_started'
      case 'inProgressTasks':
        return 'in-progress';
      case 'completedTasks':
        return 'completed';
      case 'acceptedTasks':
        return 'accepted';
      default:
        return '';
    }
  }

  allDropListsExcept(currentListId: string): string[] {
    return ['newTasks', 'inProgressTasks', 'completedTasks', 'acceptedTasks'].filter(id => id !== currentListId);
  }
}
