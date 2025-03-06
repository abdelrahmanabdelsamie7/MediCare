import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { Subject, takeUntil } from 'rxjs';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-hospitals',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule, CommonModule],
  templateUrl: './list-hospitals.component.html',
  styleUrl: './list-hospitals.component.css',
  providers: [MessageService],
})
export class ListHospitalsComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  Hospitals: IHospital[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SHospitalService: SHospitalService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.checkLanguageDirection();
    this.getHospitals();
  }
  getHospitals() {
    this._SHospitalService
      .getHospitals()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Hospitals = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteHospital(id: string) {
    this._SHospitalService
      .deleteHospital(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Hospitals = this.Hospitals.filter(
            (obj: IHospital) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Hospital Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Hospital' + err.error.message,
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
