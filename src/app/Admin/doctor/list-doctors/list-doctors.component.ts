import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [RouterModule, Toast, TranslateModule,NgStyle],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.css',
  providers: [MessageService],
})
export class ListDoctorsComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  Doctors: IDoctor[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorservice: SDoctorService,
    private _MessageService: MessageService,
    private _STranslateService :STranslateService
  ) { }
  ngOnInit() {
    this.getDoctors();
    this.checkLanguageDirection();
  }
  getDoctors() {
    this._SDoctorservice
      .getDoctors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Doctors = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  removeDoctor(id: string) {
    this._SDoctorservice
      .deleteDoctor(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Doctors = this.Doctors.filter((obj: IDoctor) => obj.id !== id);
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Removed Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Doctor',
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
