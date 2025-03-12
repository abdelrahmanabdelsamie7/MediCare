import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, TranslateModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private readonly _SAuthService = inject(SAuthService);
  private readonly _translateService = inject(STranslateService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  isRtl: boolean = false;
  msgSuccess: string = '';
  msgErr: string = '';
  isLoading: boolean = false;
  token: string = '';

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    passwordConfirmation: new FormControl(null, [Validators.required])
  });

  constructor() {
    this.checkLanguageDirection();
  }

  ngOnInit(): void {
    this.token = this._route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.msgErr = this.isRtl ? 'رابط إعادة التعيين غير صالح.' : 'Invalid reset link.';
    }
  }

  checkLanguageDirection(): void {
    this.isRtl = localStorage.getItem('lang') === 'ar';
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.token) {
      const { email, password, passwordConfirmation } = this.resetForm.value;
      if (password !== passwordConfirmation) {
        this.msgErr = this.isRtl ? 'كلمات المرور غير متطابقة.' : 'Passwords do not match.';
        return;
      }

      this.isLoading = true;
      this.msgSuccess = '';
      this.msgErr = '';

      this._SAuthService.resetPassword(email, this.token, password, passwordConfirmation).subscribe({
        next: (res) => {
          this.msgSuccess = res.message; // "Password reset successfully."
          this.isLoading = false;
          setTimeout(() => this._router.navigate(['/Login']), 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.msgErr = err.error?.error || 'Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
