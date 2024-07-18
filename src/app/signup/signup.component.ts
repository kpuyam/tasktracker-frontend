import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hide = true;
  hideConfirm = true;
  signupError = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { username, password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.signupError = 'Passwords do not match';
    } else {
      this.authService.signup(username, password).subscribe(
        () => {
          alert('User created successfully! Please login.');
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 400 && error.error.username) {
            this.signupError = `Username '${username}' already exists`;
          } else {
            this.signupError = 'Error creating user. Please try again later.';
          }
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
