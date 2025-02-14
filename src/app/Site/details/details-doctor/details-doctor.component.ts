import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { SAuthService } from '../../../Core/services/s-auth.service';
import { IUser } from '../../../Core/interfaces/i-user';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-details-doctor',
  standalone: true,
  imports: [
    CommonModule,
    TimeFormatPipe,
    Toast,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './details-doctor.component.html',
  styleUrl: './details-doctor.component.css',
  providers: [MessageService, DatePipe],
})
export class DetailsDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  userData: IUser = {} as IUser;
  appointmentDates: any[] = [];
  DoctorClinics: IDoctorClinic[] = [];
  Doctor: IDoctor = {} as IDoctor;
  isAuth: boolean = false;
  appointmentReserveInfo: IDoctorAppointment = {} as IDoctorAppointment;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorService: SDoctorService,
    private _ActivatedRoute: ActivatedRoute,
    private _SAuthService: SAuthService,
    private _MessageService: MessageService,
    private _SReservationService: SReservationService,
    private datePipe: DatePipe,
    private translate: TranslateService
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
  getFormattedDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'EEEE d MMM');
    if (formattedDate) {
      const [day, dayNumber, month] = formattedDate.split(' ');
      return `${this.translate.instant(
        'appointmentDays.' + day
      )} ${dayNumber} ${this.translate.instant('appointmentMonths.' + month)}`;
    }
    return '';
  }
  getUserData() {
    this._SAuthService.getUserAccount().subscribe({
      next: (data) => {
        this.userData = data;
        this.isAuth = true;
      },
      error:(err)=>{
        console.log(err);
      }
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
          summary: 'تم بنجاح',
          detail: 'تم الحجز بنجاح ! ',
        });
      },
      error: (err) => {
        this._MessageService.add({
          severity: 'warn',
          summary: 'تحذير',
          detail: 'برجاء التسجيل الدخول للحجز',
        });
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
