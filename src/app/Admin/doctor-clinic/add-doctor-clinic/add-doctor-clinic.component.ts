import { Component, OnInit } from '@angular/core';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-add-doctor-clinic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-doctor-clinic.component.html',
  styleUrl: './add-doctor-clinic.component.css',
  providers: [MessageService],
})
export class AddDoctorClinicComponent implements OnInit {
  isRtl:boolean=false;
  isLoading: boolean = false;
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private messageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  addDoctorClinicForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    locationUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
  });
  addDoctorClinic(addDoctorClinicForm: FormGroup) {
    if (addDoctorClinicForm.valid) {
      this.isLoading = true;
      this._SDoctorClinicService
        .addDoctorClinic(addDoctorClinicForm.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Doctor Clinic Added Successfully',
            });
            addDoctorClinicForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err.error.message}`,
            });
          },
        });
    }
  }
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
