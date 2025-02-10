import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-doctor-clinics',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule],
  templateUrl: './list-doctor-clinics.component.html',
  styleUrl: './list-doctor-clinics.component.css',
  providers: [MessageService],
})
export class ListDoctorClinicsComponent implements OnInit, OnDestroy {
  DoctorClinics: IDoctorClinic[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getDoctorClinic();
  }
  getDoctorClinic() {
    this._SDoctorClinicService
      .getDoctorClinics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinics = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDoctorClinic(id: string) {
    this._SDoctorClinicService
      .deleteDoctorClinic(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DoctorClinics = this.DoctorClinics.filter(
            (obj: IDoctorClinic) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Clinic Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Doctor Clinic' + err.error.message,
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
