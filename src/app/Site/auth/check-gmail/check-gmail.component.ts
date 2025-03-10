import { Component, inject, OnInit } from '@angular/core';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check-gmail',
  standalone: true,
  imports: [],
  templateUrl: './check-gmail.component.html',
  styleUrls: ['./check-gmail.component.css']
})
export class CheckGmailComponent implements OnInit {
  private readonly _SAuthService = inject(SAuthService);
  email: string = '';
  msgSuccess: string = '';
  msgErr: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    // Get email from service
    this.email = this._SAuthService.getTempEmail();
    if (!this.email) {
      this.msgErr = 'Please register first.';
    }
  }

  resendVerification(): void {
    if (!this.email) {
      this.msgErr = 'Please register first.';
      return;
    }

    this.isLoading = true;
    this.msgSuccess = '';
    this.msgErr = '';

    this._SAuthService.resendVerification(this.email).subscribe({
      next: (res) => {
        this.msgSuccess = res.message; // "Verification email resent successfully."
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.msgErr = err.error?.error || 'An error occurred while resending the email. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
