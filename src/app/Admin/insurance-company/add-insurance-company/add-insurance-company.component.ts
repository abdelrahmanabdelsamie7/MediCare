import { Component, OnInit } from '@angular/core';
import { SInsuranceCompanyService } from '../../../Core/services/s-insurance-company.service';
import { MessageService } from 'primeng/api';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-insurance-company',
  standalone: true,
  imports: [TranslateModule, Toast, ReactiveFormsModule, CommonModule],
  templateUrl: './add-insurance-company.component.html',
  styleUrl: './add-insurance-company.component.css',
  providers: [MessageService]
})
export class AddInsuranceCompanyComponent implements OnInit {
  isRtl: boolean = false
  constructor(
    private _SInsuranceCompanyService: SInsuranceCompanyService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) { }
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  addInsuranceCompanyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    logo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
  });
  addInsuranceCompany(addInsuranceCompanyForm: FormGroup) {
    this._SInsuranceCompanyService.addInsuranceCompany(addInsuranceCompanyForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Insurance Company Added Successfully',
        });
        addInsuranceCompanyForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `${err.error.message}`,
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
}
