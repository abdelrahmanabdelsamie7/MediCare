import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SAdminService } from '../../../Core/services/s-admin.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
  providers: [MessageService],
})
export class AdminLoginComponent {
  constructor(
    private _SAdminService: SAdminService,
    private messageService: MessageService,
    private _Router: Router
  ) {}
  adminLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  adminLogin(adminLoginForm: FormGroup) {
    this._SAdminService.adminLogin(adminLoginForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('adminToken', data.access_token);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Welcome Back `,
        });
        this._Router.navigateByUrl('/admin-mediCare-1245');
      },
    });
  }
}
