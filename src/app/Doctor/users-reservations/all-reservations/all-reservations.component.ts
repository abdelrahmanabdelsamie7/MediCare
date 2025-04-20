import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { IUser } from '../../../Core/interfaces/i-user';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-all-reservations',
  standalone: true,
  imports: [TimeFormatPipe, CommonModule, Toast, RouterModule],
  templateUrl: './all-reservations.component.html',
  styleUrl: './all-reservations.component.css',
  providers: [MessageService],
})
export class AllReservationsComponent implements OnInit, OnDestroy {
  isFetching = signal<boolean>(false);
  allReservations: any[] = [];
  appointment: IDoctorAppointment = {} as IDoctorAppointment;
  clinic: IDoctorClinic = {} as IDoctorClinic;
  user: IUser = {} as IUser;
  statusInfo: string = ' ';
  private destroy$ = new Subject<void>();
  constructor(
    private _SReservationService: SReservationService,
    private messageService: MessageService
  ) { }
  ngOnInit() {
    this.isFetching.set(true);
    this.loadReservationsData();
  }
  loadReservationsData() {
    this._SReservationService
      .getDoctorReservations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.allReservations = data.data;
        },
      });
  }
  confirmReservation(id: string) {
    this._SReservationService.doctorConfirmReservation(id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reservation confirmed successfully',
        });
        this.loadReservationsData();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to confirm reservation',
        });
      },
    })
  }
  cancelReservation(id: string) {
    this._SReservationService.doctorCancelReservation(id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reservation canceled successfully',
        });
        this.loadReservationsData();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to cancel reservation',
        });
      },
    })
  }
  makeReservationAsVisited(id: string) {
    this._SReservationService.doctorMakeReservationAsVisited(id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reservation marked as visited successfully',
        });
        this.loadReservationsData();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark reservation as visited',
        });
      },
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
