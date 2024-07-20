import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrl: './tasks-home.component.css'
})
export class TasksHomeComponent {

  // @Input() projectId!: number;
  // tasks: any[] = [];

  // constructor(private apiService: ApiService) { }

  // ngOnChanges(): void {
  //   if (this.projectId) {
  //     this.apiService.getTasks(this.projectId).subscribe((tasks) => {
  //       this.tasks = tasks;
  //     });
  //   }

  // @Input() tasks: any[] = [];

  // constructor(){}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['tasks']) {
  //     console.log('Updated tasks data:', this.tasks);
  //   }
  // }

  @Input() tasks: any[] = [];
  

}
