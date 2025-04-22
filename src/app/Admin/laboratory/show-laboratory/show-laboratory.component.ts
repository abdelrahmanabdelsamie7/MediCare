import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InsuranceCompany } from '../../../Core/interfaces/insurance-company';
import { SInsuranceCompanyService } from '../../../Core/services/s-insurance-company.service';
import { SInsuranceCompanyLaboratoryService } from '../../../Core/services/s-insurance-company-laboratory.service';

@Component({
  selector: 'app-show-laboratory',
  standalone: true,
  imports: [CommonModule, TranslateModule, Toast, ReactiveFormsModule],
  templateUrl: './show-laboratory.component.html',
  styleUrl: './show-laboratory.component.css',
   providers: [MessageService]
})
export class ShowLaboratoryComponent implements OnInit, OnDestroy {
  isRtl:boolean=false
  id: string = '';
  InsuracneCompaniesLaboratories = signal<any[]>([]);
    InsuracneCompanies: InsuranceCompany[] = [];
  Laboratory: ILaboratory = {} as ILaboratory;
  private destroy$ = new Subject<void>();
  addInsuranceCompanyToLaboratoryForm = new FormGroup({
    insurance_company_id: new FormControl('', [Validators.required]),
    laboratory_id: new FormControl(this.id), 
  });

  constructor(
        private _SInsuracneCompanieservice: SInsuranceCompanyService,
        private _SInsuranceCompanyLaboratoryService: SInsuranceCompanyLaboratoryService,
    private _SLaboratoryService: SLaboratoryService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _Location: Location,
   private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
        this.addInsuranceCompanyToLaboratoryForm.patchValue({
          laboratory_id: this.id
        });

      this.loadLaboratoryData();
      this.getInsuracneCompanies();
      },
    });

    this.checkLanguageDirection();

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
  addInsuranceCompanyToLaboratory(addInsuranceCompanyToLaboratoryForm: FormGroup) {
    addInsuranceCompanyToLaboratoryForm.patchValue({
      laboratory_id: this.id,
    });
    this._SInsuranceCompanyLaboratoryService
      .addInsuranceCompanyToLaboratory(addInsuranceCompanyToLaboratoryForm.value)
      .subscribe({
        next: (data: any) => {
          // this.InsuracneCompaniesLaboratory.update((prev) => [
          //   ...prev,
          //   data.data,
          // ]);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Added To Laboratory  Successfully',
          });
          addInsuranceCompanyToLaboratoryForm.reset();
          addInsuranceCompanyToLaboratoryForm.patchValue({
            laboratory_id: this.id,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              "You Can't Add This Insurance Company To Laboratory. Check if it already exists.",
          });
        },
      });
  }
  loadLaboratoryData() {
    this._SLaboratoryService
      .showLaboratory(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Laboratory = data.data;
          this.InsuracneCompaniesLaboratories.set(data.data.insurance_companies);
          console.log(this.InsuracneCompaniesLaboratories());
        },
      });
  }
  removeInsuranceCompanyFromLaboratory(id: string) {
    console.log(id);
    this._SInsuranceCompanyLaboratoryService
      .removeInsuranceCompayFromLaboratory(id)
      .subscribe({
        next: () => {
          this.InsuracneCompaniesLaboratories.update((prev) =>
            prev.filter((company) => company.id !== id)
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Removed From Laboratory Successfully',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to remove the insurance company from the laboratory.',
          });
          console.error(err);
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
