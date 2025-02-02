import { GoogleAuthService, GoogleButtonConfig } from './../../../Core/google-auth.service';
// src/app/components/login/login.component.ts
import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-login',
  templateUrl: './google-auth.component.html',
  styleUrl: `./google-auth.component.css`
})
export class LoginComponent implements AfterViewInit {
  private authService: GoogleAuthService = inject(GoogleAuthService);

// Custom button configuration
buttonConfig: GoogleButtonConfig = {
  theme: 'outline',
  size: 'large',
  width: 220,
  shape: 'pill',
  logo_alignment: 'left'
};

constructor(private GoogleAuthService:GoogleAuthService) {}
ngAfterViewInit() {
  this.authService.initializeButton('google-signin-button', this.buttonConfig);
  this.authService.loadGoogleOAuthScript();
}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logout() {
    this.authService.logout();
  }
}
