import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.css',
  providers: [MessageService],
})
export class DoctorLoginComponent {
  constructor(
    private _SDoctorService: SDoctorService,
    private messageService: MessageService,
    private _Router: Router
  ) {}
  doctorLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  doctorLogin(doctorLoginForm: FormGroup) {
    this._SDoctorService.doctorLogin(doctorLoginForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('doctorToken', data.access_token);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Welcome Back `,
        });
        this._Router.navigateByUrl('/doctor-mediCare-1245');
      },
    });
  }
}
