import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-list-pharmacies',
  standalone: true,
  imports: [RouterModule, Toast, CommonModule, TranslateModule,NgStyle],
  templateUrl: './list-pharmacies.component.html',
  styleUrl: './list-pharmacies.component.css',
  providers: [MessageService],
})
export class ListPharmaciesComponent implements OnInit, OnDestroy {
  isRtl:boolean=false
  currentPage: number = 1;
  lastPage: number = 1;
  Pharmacies: IPharmacy[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this.getPharmacies(this.currentPage);
    this.checkLanguageDirection();
  }
  getPharmacies(page: number) {
    const params = new HttpParams().set('page', page.toString());
    this._SPharmacyService
      .getPharmacies(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Pharmacies = data.data.data;
          this.currentPage = data.data.current_page;
          this.lastPage = data.data.last_page;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deletePharmacy(id: string) {
    this._SPharmacyService
      .deletePharmacy(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Pharmacies = this.Pharmacies.filter(
            (obj: IPharmacy) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pharmacy Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Pharmacy',
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
