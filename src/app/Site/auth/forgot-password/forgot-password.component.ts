import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private readonly _SAuthService = inject(SAuthService);
  private readonly _translateService = inject(STranslateService);
  isRtl: boolean = false;
  msgSuccess: string = '';
  msgErr: string = '';
  isLoading: boolean = false;

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor() {
    this.checkLanguageDirection();
  }

  checkLanguageDirection(): void {
    this.isRtl = localStorage.getItem('lang') === 'ar';
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.msgSuccess = '';
      this.msgErr = '';

      this._SAuthService.forgotPassword(this.forgotForm.value.email).subscribe({
        next: (res) => {
          this.msgSuccess = res.message; // "Password reset link sent to your email."
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgErr = err.error?.error || 'Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
