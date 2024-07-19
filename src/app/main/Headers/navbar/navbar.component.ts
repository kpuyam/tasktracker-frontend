import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any | null = null;

  constructor(private apiservice: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.apiservice.getUserDetails().subscribe(
      (user: any) => {
        this.user = user;
      },
      error => {
        console.error('Failed to fetch user details:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();

  }
}
