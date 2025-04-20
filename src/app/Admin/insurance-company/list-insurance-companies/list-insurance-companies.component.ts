import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { InsuranceCompany } from '../../../Core/interfaces/insurance-company';
import { Subject, takeUntil } from 'rxjs';
import { SInsuranceCompanyService } from '../../../Core/services/s-insurance-company.service';
import { MessageService } from 'primeng/api';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-insurance-companies',
  standalone: true,
  imports: [Toast, CommonModule,TranslateModule,RouterModule],
  templateUrl: './list-insurance-companies.component.html',
  styleUrl: './list-insurance-companies.component.css',
  providers: [MessageService],
})
export class ListInsuranceCompaniesComponent implements OnInit, OnDestroy {

  isRtl: boolean = false;
  insuranceCompanies = signal<InsuranceCompany[]>([])
  private destroy$ = new Subject<void>();
  constructor(
    private _SInsuranceCompanyService: SInsuranceCompanyService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) { }
  ngOnInit() {
    this.checkLanguageDirection();
    this.getInsuranceCompanies();
  }
  getInsuranceCompanies() {
    this._SInsuranceCompanyService
      .getInsuranceCompanies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.insuranceCompanies.set(data.data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteInsuranceCompany(id: string) {
    this._SInsuranceCompanyService
      .deleteInsuranceCompany(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.insuranceCompanies.update((prev) => {
            return prev.filter((insuranceCompany) => insuranceCompany.id !== id);
          })
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Insurance Company' + err.error.message,
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
