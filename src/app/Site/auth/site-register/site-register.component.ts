import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from "../google-auth/google-auth.component";

@Component({
  selector: 'app-site-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterModule, LoginComponent],
  templateUrl: './site-register.component.html',
  styleUrl: './site-register.component.css',
})
export class SiteRegisterComponent {
  private readonly _SAuthService = inject(SAuthService);
  private readonly _Router = inject(Router);
  msgErr: string = '';
  msgSuccess: boolean = false;
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      password_confirmation: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      birth_date: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
    },
    this.confirmPassword
  );
  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._SAuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.msgSuccess = true;
          setTimeout(() => {
            this._Router.navigate(['/Login']);
          }, 1000);

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgErr = err.error;
          console.log(err);
          this.isLoading = false;
        },
      });
      console.log(this.registerForm.value);
    }
  }
  // custom validation function---->g:registerForm
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('password_confirmation')?.value) {
      return null;
    } else {
      return {
        mismatch: true,
      };
    }
  }
}
