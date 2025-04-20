import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-pharmacies-rating',
  standalone: true,
  imports: [Toast, TranslateModule, RouterModule, CommonModule],
  templateUrl: './review-pharmacies-rating.component.html',
  styleUrl: './review-pharmacies-rating.component.css',
  providers: [MessageService],
})
export class ReviewPharmaciesRatingComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  PharmaciesRatings = signal<any[]>([]);
  private destroy$ = new Subject<void>();
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) { }
  ngOnInit() {
    this.getPharmaciesRatings();
    this.checkLanguageDirection();
  }
  getPharmaciesRatings() {
    this._SPharmacyService
      .allRatesPharmacy()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.PharmaciesRatings.set(data.data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteRatingOfPharmacy(id: string) {
    this._SPharmacyService
      .adminDeleteRatePharmacy(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.PharmaciesRatings.update((prev) =>
            prev.filter((obj: any) => obj.id !== id));
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Rating Of Pharmacy Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Rating Of Pharmacy',
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
