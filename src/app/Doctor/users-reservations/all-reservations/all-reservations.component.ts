import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { IUser } from '../../../Core/interfaces/i-user';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-reservations',
  standalone: true,
  imports: [TimeFormatPipe, CommonModule],
  templateUrl: './all-reservations.component.html',
  styleUrl: './all-reservations.component.css',
  providers: [MessageService],
})
export class AllReservationsComponent implements OnInit, OnDestroy {
  allReservations: any[] = [];
  appointment: IDoctorAppointment = {} as IDoctorAppointment;
  clinic: IDoctorClinic = {} as IDoctorClinic;
  user: IUser = {} as IUser;
  statusInfo: string = ' ';
  private destroy$ = new Subject<void>();
  constructor(
    private _SReservationService: SReservationService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.loadReservationsData();
  }
  loadReservationsData() {
    this._SReservationService
      .getDoctorReservations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allReservations = data.data;
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
