import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-site-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, LoginComponent, NgStyle, TranslateModule],
  templateUrl: './site-login.component.html',
  styleUrl: './site-login.component.css',
})
export class SiteLoginComponent {
  private readonly _SAuthService = inject(SAuthService);
  private readonly _Router = inject(Router);
  public _translateService = inject(STranslateService);
  msgErr: string = '';
  isRtl: boolean = false;
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
          if (err.error.error == 'Invalid credentials') {
            this.msgErr = 'تاكد من صحة بريدك الالكتروني او كلمة المرور ! ';
          } else {
            this.msgErr = 'يرجى التأكد من بريدك الإلكتروني لتسجيل الدخول بنجاح .. ';
          }
          this.isLoading = false;
        },
      });
    }
  }
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this.isRtl = localStorage.getItem('lang') === 'ar';
  }
}
