import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  roles: any[] = [];
  users: any[] = [];
  selectedRoleId: number | null = null;
  selectedUserId: number | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadUsers();
  }

  loadRoles(): void {
    this.apiService.getRoles().subscribe(
      roles => this.roles = roles,
      error => console.error('Error fetching roles', error)
    );
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(
      users => this.users = users.filter(user => !user.role_id),  // Filter users without roles
      error => console.error('Error fetching users', error)
    );
  }

  assignRole(): void {
    if (this.selectedRoleId && this.selectedUserId) {
      this.apiService.updateUserRole(this.selectedRoleId, this.selectedUserId).subscribe(
        response => {
          console.log('Role assigned successfully', response);
          // Optionally, refresh or update the UI
        },
        error => {
          console.error('Error assigning role', error);
        }
      );
    } else {
      console.error('Role ID or User ID is missing');
    }
  }
}
