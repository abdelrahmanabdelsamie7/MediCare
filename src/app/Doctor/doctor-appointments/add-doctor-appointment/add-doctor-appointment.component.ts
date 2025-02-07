import { Component, OnDestroy, OnInit } from '@angular/core';
import { SDoctorAppiontmentService } from '../../../Core/services/s-doctor-appiontment.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-doctor-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-doctor-appointment.component.html',
  styleUrl: './add-doctor-appointment.component.css',
  providers: [MessageService],
})
export class AddDoctorAppointmentComponent implements OnInit, OnDestroy {
  DoctorClinics: IDoctorClinic[] = [];
  addDoctorAppointmentForm = new FormGroup({
    day: new FormControl('', [Validators.required, Validators.minLength(3)]),
    start_at: new FormControl('', [Validators.required]),
    end_at: new FormControl('', [Validators.required]),
    duration: new FormControl(0, [Validators.required]),
    clinic_id: new FormControl('', [Validators.required]),
    doctor_id: new FormControl(localStorage.getItem('doctorId'), [
      Validators.required,
    ]),
  });
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorAppiontmentService: SDoctorAppiontmentService,
    private messageService: MessageService,
    private _SDoctorService: SDoctorService
  ) {}
  ngOnInit(): void {
    this.loadDoctorClinics();
  }
  loadDoctorClinics() {
    this._SDoctorService
      .showDoctor(`${localStorage.getItem('doctorId')}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinics = data.data.clinics;
          console.log(this.DoctorClinics);
        },
      });
  }
  addDoctorAppointment(addDoctorAppointmentForm: FormGroup) {
    this._SDoctorAppiontmentService
      .addDoctorAppointment(addDoctorAppointmentForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Appointment Added Successfully',
          });
          addDoctorAppointmentForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `${err.error.message}`,
          });
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
