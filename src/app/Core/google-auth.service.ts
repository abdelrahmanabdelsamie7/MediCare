// src/app/services/google-auth.service.ts
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Add type for button configuration options
export interface GoogleButtonConfig {
  theme?: 'filled_blue' | 'filled_black' | 'outline';
  size?: 'small' | 'medium' | 'large';
  width?: number;
  text?: 'signin_with' | 'signup_with';
  shape?: 'rectangular' | 'pill';
  logo_alignment?: 'left' | 'center';
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string,
            callback: (response: { credential: string }) => void
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: GoogleButtonConfig
          ) => void;
        }
      }
    }
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loadGoogleOAuthScript(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }}
  private http = inject(HttpClient);
  private readonly apiUrl = environment.baseUrl;
  private readonly clientId = environment.googleClientId;
  private router = inject(Router);

  // Default button configuration
  private defaultButtonConfig: GoogleButtonConfig = {
    theme: 'filled_blue',
    size: 'large',
    text: 'signin_with',
    shape: 'rectangular',
    width: 300
  };

  initializeButton(buttonId: string = 'google-signin-button', config?: GoogleButtonConfig) {
    const mergedConfig = { ...this.defaultButtonConfig, ...config };

    window.google?.accounts.id.initialize({
      client_id: this.clientId,
      callback: ({ credential }: { credential: string }) => this.handleSignIn(credential)

    });

    window.google?.accounts.id.renderButton(
      document.getElementById(buttonId),
      mergedConfig
    );
  }

  private handleSignIn(token: string) {
    this.http.post<{ access_token: string, user: any }>(
      `${this.apiUrl}/user/auth/google`,
      { token }
    ).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.access_token);
        localStorage.setItem('userId', JSON.stringify(res.user.id));
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Authentication failed:', err)
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  }
}
