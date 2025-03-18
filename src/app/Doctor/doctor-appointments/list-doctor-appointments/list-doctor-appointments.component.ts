import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorAppiontmentService } from '../../../Core/services/s-doctor-appiontment.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-list-doctor-appointments',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule,NgStyle],
  templateUrl: './list-doctor-appointments.component.html',
  styleUrl: './list-doctor-appointments.component.css',
  providers: [MessageService],
})
export class ListDoctorAppointmentsComponent implements OnInit, OnDestroy {
  DoctorAppointments: IDoctorAppointment[] = [];
  isRtl: boolean = false;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorAppiontmentService: SDoctorAppiontmentService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.checkLanguageDirection();
    this.getDoctorAppointments();
  }
  getDoctorAppointments() {
    this._SDoctorAppiontmentService
      .getDoctorAppointments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.DoctorAppointments = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDoctorAppointment(id: string) {
    this._SDoctorAppiontmentService
      .deleteDoctorAppointment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DoctorAppointments = this.DoctorAppointments.filter(
            (obj: IDoctorAppointment) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Appointment Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Doctor Appointment',
          });
        },
      });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
