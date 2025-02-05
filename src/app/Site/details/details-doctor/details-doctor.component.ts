import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { IUser } from '../../../Core/interfaces/i-user';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { IReservation } from '../../../Core/interfaces/i-reservation';

@Component({
  selector: 'app-details-doctor',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, Toast, ReactiveFormsModule],
  templateUrl: './details-doctor.component.html',
  styleUrl: './details-doctor.component.css',
  providers: [MessageService],
})
export class DetailsDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  userData: IUser = {} as IUser;
  appointmentDates: any[] = [];
  DoctorClinics: IDoctorClinic[] = [];
  Doctor: IDoctor = {} as IDoctor;
  appointmentReserveInfo: IDoctorAppointment = {} as IDoctorAppointment;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorService: SDoctorService,
    private _ActivatedRoute: ActivatedRoute,
    private _SAuthService: SAuthService,
    private _MessageService: MessageService,
    private _SReservationService: SReservationService
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
  }
  ngOnInit() {
    this.loadDoctorData();
    this.getUserData();
  }
  getUserData() {
    this._SAuthService.getUserAccount().subscribe({
      next: (data) => {
        this.userData = data;
      },
    });
  }
  loadDoctorData() {
    this._SDoctorService
      .showDoctor(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Doctor = data.data;
          this.DoctorClinics = this.Doctor.clinics;
          console.log(data);
          if (data.data.appointmentsGroupedByDate) {
            this.appointmentDates = Object.keys(
              data.data.appointmentsGroupedByDate
            ).map((date: string) => ({
              date,
              appointments: data.data.appointmentsGroupedByDate[date],
            }));
            console.log('Appointment Dates:', this.appointmentDates);
          } else {
            console.log('No appointments data available.');
          }
        },
      });
  }
  openModal(appointment: IDoctorAppointment) {
    this.appointmentReserveInfo = appointment;
  }

  reserveAppointment(reservInfo: IDoctorAppointment) {
    let reservationInfo = {
      user_id: `${localStorage.getItem('userId')}`,
      doctor_id: reservInfo.doctor_id,
      appointment_id: reservInfo.id,
      clinic_id: reservInfo.clinic_id,
      status: 'pending',
    };
    this._SReservationService.userReserveDoctor(reservationInfo).subscribe({
      next: (data) => {
        console.log(data);
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'تم الحجز بنجاح ! ',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
