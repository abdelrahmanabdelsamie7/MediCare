import { Component, OnInit } from '@angular/core';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, Toast],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.css',
  providers: [DatePipe, MessageService],
})
export class UserReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private _SReservationService: SReservationService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getAllReservations();
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
  getAllReservations() {
    this._SReservationService.getUserReservations().subscribe({
      next: (data) => {
        console.log(data);
        this.reservations = data.data;
      },
    });
  }
  confirmReservation(reservationId: string) {
    this._SReservationService.confirmReservation(reservationId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'تم تأكيد الحجز بنجاح',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  cancelReservation(reservationId: string) {
    this._SReservationService.cancelReservation(reservationId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'تم إلغاء الحجز',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
