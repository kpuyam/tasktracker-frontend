import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any | null = null;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails().subscribe(
      (user: any) => {
        this.user = user;
        this.checkAdminRole();
      }
    );
  }

  checkAdminRole(): void {
    this.apiService.getRoles().subscribe(
      (roles: any[]) => {
        const adminRole = roles.find(role => role.name === 'admin');
        if (adminRole) {
          this.isAdmin = adminRole.users.includes(this.user?.id);
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
