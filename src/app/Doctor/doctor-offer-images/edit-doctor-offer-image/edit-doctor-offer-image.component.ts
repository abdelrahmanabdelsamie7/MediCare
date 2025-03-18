import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOfferImage } from '../../../Core/interfaces/i-doctor-offer-image';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-doctor-offer-image',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast,TranslateModule],
  templateUrl: './edit-doctor-offer-image.component.html',
  styleUrl: './edit-doctor-offer-image.component.css',
  providers: [MessageService],
})
export class EditDoctorOfferImageComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  id: string = '';
  DoctorOfferImage: IDoctorOfferImage = {} as IDoctorOfferImage;
  DoctorOffers: IDoctorOffer[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService:STranslateService
  ) {}
  editDoctorOfferImageForm = new FormGroup({
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    doctor_offer_id: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.checkLanguageDirection();
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorOfferImageData();
    this.loadDoctorOffers();
  }
  loadDoctorOfferImageData() {
    this._SDoctorOfferService
      .showDoctorOfferImage(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorOfferImage = data.data;
          this.editDoctorOfferImageForm.patchValue({
            image: this.DoctorOfferImage.image,
            doctor_offer_id: this.DoctorOfferImage.doctor_offer_id,
          });
        },
      });
  }
  loadDoctorOffers() {
    this._SDoctorOfferService
      .getDoctorOffers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorOffers = data.data;
        },
      });
  }
  editDoctorOfferImage(editDoctorOfferImageForm: FormGroup) {
    if (this.editDoctorOfferImageForm.invalid) return;
    this._SDoctorOfferService
      .editDoctorOfferImage(editDoctorOfferImageForm.value, this.id)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Offer Image Edited Successfully',
          });
          editDoctorOfferImageForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Doctor Offer Image Couldn't Be Edited" + err.error.message,
          });
        },
      });
  }
  back() {
    this._Location.back();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
