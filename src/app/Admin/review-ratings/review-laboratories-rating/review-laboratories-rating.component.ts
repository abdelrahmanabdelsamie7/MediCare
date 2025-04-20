import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-review-laboratories-rating',
  standalone: true,
  imports: [Toast, CommonModule,TranslateModule],
  templateUrl: './review-laboratories-rating.component.html',
  styleUrl: './review-laboratories-rating.component.css',
  providers: [MessageService],
})

export class ReviewLaboratoriesRatingComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  LaboratoriesRatings = signal<any[]>([]);
  private destroy$ = new Subject<void>();
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) { }
  ngOnInit() {
    this.getLaboratoriesRatings();
    this.checkLanguageDirection();
  }
  getLaboratoriesRatings() {
    this._SLaboratoryService
      .allRatesLaboratory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.LaboratoriesRatings.set(data.data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteRatingOfLaboratory(id: string) {
    this._SLaboratoryService
      .adminDeleteRateLaboratory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.LaboratoriesRatings.update((prev) =>
            prev.filter((obj: any) => obj.id !== id));
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Rating Of Laboratory Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Rating Of Laboratory',
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