import { Component, Input, Output } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teammates',
  templateUrl: './teammates.component.html',
  styleUrl: './teammates.component.css'
})
export class TeammatesComponent {

  // @Input() projectId!: number;
  // users: any[] = [];

  // constructor(private apiService: ApiService) { }

  // ngOnChanges(): void {
  //   if (this.projectId) {
  //     this.apiService.getUsersByProject(this.projectId).subscribe((users) => {
  //       this.users = users;
  //     });
  //   }
  // }
  @Input() projectOwner: any;
  @Input() teammates: any[] | null = null;

  // ngOnInit(): void {
  //   console.log('Project Owner:', this.projectOwner);
  //   console.log('Teammates:', this.teammates);
  // }

}
