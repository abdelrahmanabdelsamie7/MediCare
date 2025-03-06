import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-pharmacy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-pharmacy.component.html',
  styleUrl: './add-pharmacy.component.css',
  providers: [MessageService],
})
export class AddPharmacyComponent implements OnInit, OnDestroy {
  isRtl:boolean=false
  ChainsPharmacies: IChainPharmacies[] = [];
  private destroy$ = new Subject<void>();
  addPharmacyForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    service: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    area: new FormControl('', [Validators.required, Validators.minLength(3)]),
    locationUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    whatsappLink: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    deliveryOption: new FormControl(1, [Validators.required]),
    insurence: new FormControl(1, [Validators.required]),
    start_at: new FormControl('', [CustomValidators.date]),
    end_at: new FormControl('', [CustomValidators.date]),
    chain_pharmacy_id: new FormControl('', []),
  });
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _SChainPharmaciesService: SChainPharmaciesService,
    private messageService: MessageService,
     private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.loadChainPharmacies();
      this.checkLanguageDirection();
  }
  loadChainPharmacies() {
    this._SChainPharmaciesService
      .getChainPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainsPharmacies = data.data;
        },
      });
  }
  addPharmacy(addPharmacyForm: FormGroup) {
    this._SPharmacyService.addPharmacy(addPharmacyForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Pharmacy Added Successfully',
        });
        addPharmacyForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
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
