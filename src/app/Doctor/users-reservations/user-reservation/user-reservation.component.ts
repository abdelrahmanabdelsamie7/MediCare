import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { ActivatedRoute } from '@angular/router';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { IUser } from '../../../Core/interfaces/i-user';
import { AgePipe } from '../../../Core/pipes/age.pipe';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reservation',
  standalone: true,
  imports: [AgePipe, TimeFormatPipe, CommonModule],
  templateUrl: './user-reservation.component.html',
  styleUrl: './user-reservation.component.css',
})
export class UserReservationComponent implements OnInit, OnDestroy {
  id: string = '';
  appointment: IDoctorAppointment = {} as IDoctorAppointment;
  clinic: IDoctorClinic = {} as IDoctorClinic;
  user: IUser = {} as IUser;
  statusInfo: string = ' ';
  finalPrice: number = 0;
  private destroy$ = new Subject<void>();
  constructor(
    private _SReservationService: SReservationService,
    private _ActivatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadReservationData();
  }
  loadReservationData() {
    this._SReservationService
      .getDoctorReservationById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.finalPrice = data.data.final_price;
          this.appointment = data.data.appointment;
          this.clinic = data.data.clinic;
          this.user = data.data.user;
          this.statusInfo = data.data.status;
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
