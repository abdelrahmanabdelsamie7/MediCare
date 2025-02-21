import { Component, OnInit, ViewChild } from '@angular/core';
import { SReservationService } from '../../../Core/services/s-reservation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { PaymentComponent } from '../../components/payment/payment.component';
@Component({
  standalone: true,
  selector: 'app-user-reservations',
  imports: [CommonModule, TimeFormatPipe, Toast,PaymentComponent],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.css',
  providers: [DatePipe, MessageService],
})
export class UserReservationsComponent implements OnInit {
  @ViewChild(PaymentComponent) paymentModal!: PaymentComponent;
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
  ngAfterViewInit(): void {
    // Listen for payment success from the PaymentComponent
    if (this.paymentModal) {
      this.paymentModal.paymentSuccess.subscribe(() => this.reloadComponent());
    }
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
        this.reservations = data.data;
      },
    });
  }
  confirmReservation(reservationId: string) {
    this._SReservationService.confirmReservation(reservationId).subscribe({
      next: (data: any) => {
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
  // Open the payment modal
  openPaymentModal(id: number, price: number) {
    if (this.paymentModal) {
      this.paymentModal.showModal(id, price);
    }
  }
  reloadComponent(): void {
    this.getAllReservations();
  }

}
