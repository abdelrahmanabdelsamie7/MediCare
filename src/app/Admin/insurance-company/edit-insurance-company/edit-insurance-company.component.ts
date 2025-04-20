import { Component, OnInit } from '@angular/core';
import { SInsuranceCompanyService } from '../../../Core/services/s-insurance-company.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceCompany } from '../../../Core/interfaces/insurance-company';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-insurance-company',
  standalone: true,
  imports: [Toast, CommonModule, ReactiveFormsModule,TranslateModule],
  templateUrl: './edit-insurance-company.component.html',
  styleUrl: './edit-insurance-company.component.css',
  providers: [MessageService],
})
export class EditInsuranceCompanyComponent implements OnInit {
  isRtl: boolean = false;
  id: string = '';
  InsuranceCompany: InsuranceCompany = {} as InsuranceCompany;
  private destroy$ = new Subject<void>();
  constructor(
    private _SInsuranceCompanyService: SInsuranceCompanyService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService: STranslateService
  ) { }
  editInsuranceCompanyForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    logo: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
  });
  ngOnInit() {
    this.checkLanguageDirection();
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadInsuranceCompanyData();
  }
  loadInsuranceCompanyData() {
    this._SInsuranceCompanyService
      .showInsuranceCompany(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.InsuranceCompany = data.data;
          this.editInsuranceCompanyForm.patchValue({
            name: this.InsuranceCompany.name,
            logo: this.InsuranceCompany.logo,
          });
        },
      });
  }
  editInsuranceCompany(editInsuranceCompanyForm: FormGroup) {
    if (this.editInsuranceCompanyForm.invalid) return;
    this._SInsuranceCompanyService
      .editInsuranceCompany(this.id, editInsuranceCompanyForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Insurance Company Edited Successfully',
          });
          editInsuranceCompanyForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Insurance Company Couldn't Be Edited" + err.error.message,
          });
        },
      });
  }
  back() {
    this._Location.back();
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
