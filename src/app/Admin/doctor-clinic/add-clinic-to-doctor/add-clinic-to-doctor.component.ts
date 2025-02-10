import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-clinic-to-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-clinic-to-doctor.component.html',
  styleUrl: './add-clinic-to-doctor.component.css',
  providers: [MessageService],
})
export class AddClinicToDoctorComponent implements OnInit, OnDestroy {
  DoctorClinics: IDoctorClinic[] = [];
  Doctors: IDoctor[] = [];
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();
  addClinicToDoctorForm = new FormGroup({
    doctor_id: new FormControl('', [Validators.required]),
    clinic_id: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private _SDoctorService: SDoctorService,
    private messageService: MessageService,
    private _Location: Location
  ) {}
  ngOnInit(): void {
    this.loadDoctorClinic();
    this.loadDoctors();
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
  loadDoctors() {
    this._SDoctorService
      .getDoctors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Doctors = data.data;
        },
      });
  }
  addClinicToDoctor(addClinicToDoctorForm: FormGroup) {
    if (addClinicToDoctorForm.valid) {
      this.isLoading = true;
      this._SDoctorClinicService
        .addClinicToDoctor(addClinicToDoctorForm.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Clinic Added To Doctor Successfully',
            });
            addClinicToDoctorForm.reset();
          },
          error: (err) => {
            console.log(err);

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
