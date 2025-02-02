import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
@Component({
  selector: 'app-details-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-doctor.component.html',
  styleUrl: './details-doctor.component.css',
})
export class DetailsDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  appointmentDates: any[] = [];
  DoctorClinics: IDoctorClinic[] = [];
  Doctor: IDoctor = {} as IDoctor;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorService: SDoctorService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
  }
  ngOnInit() {
    this.loadDoctorData();
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
