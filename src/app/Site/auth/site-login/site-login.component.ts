import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from "../google-auth/google-auth.component";

@Component({
  selector: 'app-site-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, LoginComponent],
  templateUrl: './site-login.component.html',
  styleUrl: './site-login.component.css',
})
export class SiteLoginComponent {
  private readonly _SAuthService = inject(SAuthService);
  private readonly _Router = inject(Router);
  msgErr: string = '';
  msgSuccess: boolean = false;
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
  });
  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._SAuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('userToken', res.access_token);
          this.msgSuccess = true;
          setTimeout(() => {
            this._Router.navigate(['/user-profile']);
          }, 1000);

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgErr = 'تاكد من صحة بريدك الالكتروني او كلمة المرور ! ';
          this.isLoading = false;
        },
      });
    }
  }
}
