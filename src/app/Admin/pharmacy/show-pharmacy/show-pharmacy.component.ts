import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { InsuranceCompany } from '../../../Core/interfaces/insurance-company';
import { SInsuranceCompanyService } from '../../../Core/services/s-insurance-company.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { SInsuranceCompanyPharmacyService } from '../../../Core/services/s-insurance-company-pharmacy.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-show-pharmacy',
  standalone: true,
  imports: [CommonModule, TranslateModule, TimeFormatPipe, Toast, ReactiveFormsModule],
  templateUrl: './show-pharmacy.component.html',
  styleUrl: './show-pharmacy.component.css',
  providers: [MessageService]
})
export class ShowPharmacyComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  id: string = '';
  InsuracneCompaniesPharmacy = signal<any[]>([]);
  InsuracneCompanies: InsuranceCompany[] = [];
  pharmacy: IPharmacy = {} as IPharmacy;
  private destroy$ = new Subject<void>();
  addInsuranceCompanyToPharmcyForm = new FormGroup({
    insurance_company_id: new FormControl('', [Validators.required]),
    pharmacy_id: new FormControl(this.id),
  });
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _SInsuracneCompanieservice: SInsuranceCompanyService,
    private _SInsuranceCompanyPharmacyService: SInsuranceCompanyPharmacyService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _Location: Location,
    private _STranslateService: STranslateService
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
  }
  ngOnInit() {
    this.loadPharmacyData();
    this.checkLanguageDirection();
    this.getInsuracneCompanies();
    this.addInsuranceCompanyToPharmcyForm.patchValue({
      pharmacy_id: this.id,
    });
  }
  getInsuracneCompanies() {
    this._SInsuracneCompanieservice
      .getInsuranceCompanies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.InsuracneCompanies = data.data;

        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  addInsuranceCompanyToPharmcy(addInsuranceCompanyToPharmcyForm: FormGroup) {
    addInsuranceCompanyToPharmcyForm.patchValue({
      pharmacy_id: this.id,
    });
    this._SInsuranceCompanyPharmacyService
      .addInsuranceCompanyToPharmacy(addInsuranceCompanyToPharmcyForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          // this.InsuracneCompaniesPharmacy.update((prev) => [
          //   ...prev,
          //   data.data,
          // ]);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Added To Pharmacy Successfully',
          });
          addInsuranceCompanyToPharmcyForm.reset();
          addInsuranceCompanyToPharmcyForm.patchValue({
            pharmacy_id: this.id,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              "You Can't Add This Insurance Company To Pharmacy. Check if it already exists.",
          });
        },
      });
  }
  removeInsuranceCompanyFromPharmacy(id: string) {
    console.log(id);
    this._SInsuranceCompanyPharmacyService
      .removeInsuranceCompayFromPharmacy(id)
      .subscribe({
        next: () => {
          this.InsuracneCompaniesPharmacy.update((prev) =>
            prev.filter((company) => company.id !== id)
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Removed From Pharmacy Successfully',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to remove the insurance company from the pharmacy.',
          });
          console.error(err);
        },
      });
  }

  loadPharmacyData() {
    this._SPharmacyService
      .showPharmacy(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.pharmacy = data.data;
          console.log(this.pharmacy);
          this.InsuracneCompaniesPharmacy.set(data.data.insurance_companies);
          console.log(this.InsuracneCompaniesPharmacy());
        },
      });
  }
  back() {
    this._Location.back();
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
