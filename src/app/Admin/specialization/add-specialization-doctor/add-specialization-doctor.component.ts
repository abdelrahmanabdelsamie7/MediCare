import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISpecialization } from '../../../Core/interfaces/i-specialization';
import { Subject, takeUntil } from 'rxjs';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-specialization-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-specialization-doctor.component.html',
  styleUrl: './add-specialization-doctor.component.css',
  providers: [MessageService],
})
export class AddSpecializationDoctorComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  Specializations: ISpecialization[] = [];
  Doctors: IDoctor[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private _SDoctorService: SDoctorService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  addSpecializationDoctorForm = new FormGroup({
    doctor_id: new FormControl('', Validators.required),
    specialization_id: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getSpecializations();
    this.getDoctors();
    this.checkLanguageDirection();
  }
  getSpecializations() {
    this._SSpeicalizationService
      .getSpecializations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Specializations = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  getDoctors() {
    this._SDoctorService
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
  addSpecializationDoctor(addSpecializationDoctorForm: FormGroup) {
    this._SSpeicalizationService
      .addSpecializationDoctor(addSpecializationDoctorForm.value)
      .subscribe({
        next: (data) => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              'Specialization Added To Doctor Successfully , Check Doctor Info',
          });
          addSpecializationDoctorForm.reset();
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'error',
            detail: `Check Your Data , ${err.error.message}`,
          });
        },
      });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
