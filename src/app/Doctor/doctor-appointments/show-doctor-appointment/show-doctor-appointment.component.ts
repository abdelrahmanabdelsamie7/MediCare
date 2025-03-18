import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorAppointment } from '../../../Core/interfaces/i-doctor-appiontment';
import { SDoctorAppiontmentService } from '../../../Core/services/s-doctor-appiontment.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-show-doctor-appointment',
  standalone: true,
  imports: [RouterModule, TranslateModule , CommonModule],
  templateUrl: './show-doctor-appointment.component.html',
  styleUrl: './show-doctor-appointment.component.css',
})
export class ShowDoctorAppointmentComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  id: string = '';
  ClinciDoctor: IDoctorClinic = {} as IDoctorClinic;
  DoctorAppointment: IDoctorAppointment = {} as IDoctorAppointment;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorAppiontmentService: SDoctorAppiontmentService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.checkLanguageDirection();
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorAppointmentData();
  }
  loadDoctorAppointmentData() {
    this._SDoctorAppiontmentService
      .showDoctorAppointment(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorAppointment = data.data;
          this.ClinciDoctor = this.DoctorAppointment.clinic;
        },
      });
  }
  back() {
    this._Location.back();
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
