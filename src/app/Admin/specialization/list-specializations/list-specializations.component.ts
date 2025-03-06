import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISpecialization } from '../../../Core/interfaces/i-specialization';
import { Subject, takeUntil } from 'rxjs';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-list-specializations',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule,NgStyle],
  templateUrl: './list-specializations.component.html',
  styleUrl: './list-specializations.component.css',
  providers: [MessageService],
})
export class ListSpecializationsComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  Specializations: ISpecialization[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this.getSpecializations();
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
  deleteSpecialization(id: string) {
    this._SSpeicalizationService
      .deleteSpecialization(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Specializations = this.Specializations.filter(
            (obj: ISpecialization) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Specialization Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Specialization',
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
