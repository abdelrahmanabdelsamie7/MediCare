import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { CustomValidators } from 'ng2-validation';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { Subject, takeUntil } from 'rxjs';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-edit-pharmacy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './edit-pharmacy.component.html',
  styleUrl: './edit-pharmacy.component.css',
  providers: [MessageService],
})
export class EditPharmacyComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  id: string = '';
  private destroy$ = new Subject<void>();
  Pharmacy: IPharmacy = {} as IPharmacy;
  ChainsPharmacies: IChainPharmacies[] = [];
  constructor(
    private _SPharmacyService: SPharmacyService,
    private SChainPharmaciesService: SChainPharmaciesService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService:STranslateService
  ) {}
  editPharmacyForm = new FormGroup({
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
      Validators.required,
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
    start_at: new FormControl(this.Pharmacy.start_at, [CustomValidators.date]),
    end_at: new FormControl(this.Pharmacy.end_at, [CustomValidators.date]),
    chain_pharmacy_id: new FormControl('', []),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadPharmacyData();
    this.loadChainsPharmacies();
    this.checkLanguageDirection();
  }
  loadPharmacyData() {
    this._SPharmacyService.showPharmacy(this.id).subscribe({
      next: (data: any) => {
        this.Pharmacy = data.data;
        this.editPharmacyForm.patchValue({
          title: this.Pharmacy.title,
          service: this.Pharmacy.service,
          image: this.Pharmacy.image,
          phone: this.Pharmacy.phone,
          area: this.Pharmacy.area,
          city: this.Pharmacy.city,
          locationUrl: this.Pharmacy.locationUrl,
          whatsappLink: this.Pharmacy.whatsappLink,
          deliveryOption: this.Pharmacy.deliveryOption,
          insurence: this.Pharmacy.insurence,
          start_at: this.Pharmacy.start_at,
          end_at: this.Pharmacy.end_at,
          chain_pharmacy_id: this.Pharmacy.chain_pharmacy_id,
        });
      },
    });
  }
  loadChainsPharmacies() {
    this.SChainPharmaciesService.getChainPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainsPharmacies = data.data;
        },
      });
  }
  editPharmacy(editPharmacyForm: FormGroup) {
    if (this.editPharmacyForm.invalid) return;
    this._SPharmacyService
      .editPharmacy(this.id, editPharmacyForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pharmacy Edited Successfully',
          });
          editPharmacyForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Pharmacy Couldn't Be Edited",
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
