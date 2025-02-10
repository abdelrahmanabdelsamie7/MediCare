import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-doctor-clinic-image',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-doctor-clinic-image.component.html',
  styleUrl: './add-doctor-clinic-image.component.css',
  providers: [MessageService],
})
export class AddDoctorClinicImageComponent implements OnInit, OnDestroy {
  DoctorClinics: IDoctorClinic[] = [];
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();
  addDoctorClinicImageForm = new FormGroup({
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    clinic_id: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private messageService: MessageService,
    private _Location: Location
  ) {}
  ngOnInit(): void {
    this.loadDoctorClinic();
  }
  loadDoctorClinic() {
    this._SDoctorClinicService
      .getDoctorClinics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinics = data.data;
        },
      });
  }
  addDoctorClinicImage(addDoctorClinicImageForm: FormGroup) {
    if (addDoctorClinicImageForm.valid) {
      this.isLoading = true;
      this._SDoctorClinicService
        .addDoctorClinicImage(addDoctorClinicImageForm.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Doctor Clinic Image Added Successfully',
            });
            addDoctorClinicImageForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: `${err.error.message}`,
            });
          },
        });
    }
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
