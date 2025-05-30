import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TimeFormatPipe } from "../../../Core/pipes/time-format.pipe";
@Component({
  selector: 'app-details-pharamcy',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Toast, TranslateModule, TimeFormatPipe],
  templateUrl: './details-pharamcy.component.html',
  styleUrl: './details-pharamcy.component.css',
  providers: [MessageService],
})
export class DetailsPharamcyComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  id: string = '';
  isAuth: boolean = false;
  stars = [1, 2, 3, 4, 5];
  showReviewInput: boolean = false;
  ratesOfPharmacy: any[] = [];
  insuranceCompanies: any[] = [];
  pharmacy: IPharmacy = {} as IPharmacy;
  isFetching = signal<boolean>(false);
  private destroy$ = new Subject<void>();
  reviewForm = new FormGroup({
    rating_value: new FormControl(0, [Validators.required, Validators.min(1)]),
    review: new FormControl('', [Validators.required]),
    user_id: new FormControl(localStorage.getItem('userId'), [
      Validators.required,
    ]),
    pharmacy_id: new FormControl(`${this.id}`, [Validators.required]),
  });
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _ActivatedRoute: ActivatedRoute,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.reviewForm.patchValue({ pharmacy_id: this.id });
  }
  toggleReviewInput(): void {
    this.showReviewInput = !this.showReviewInput;
  }
  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating_value: rating });
  }
  getStarArray() {
    const rating = Math.floor(this.pharmacy.avg_rate);
    if (isNaN(rating) || rating < 0) {
      return [];
    }
    return new Array(rating);
  }
  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.isAuth = true;
    }
    this.loadPharmacyData();
    this.checkLanguageDirection();
  }
  loadPharmacyData() {
    this.isFetching.set(true);
    this._SPharmacyService
      .showPharmacy(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.pharmacy = data.data;
          console.log(this.pharmacy);
          this.ratesOfPharmacy = data.data.users;
          this.insuranceCompanies = data.data.insurance_companies;
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error loading pharmacy data:', err);
        }
      });
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  submitReview(reviewForm: FormGroup): void {
    this._SPharmacyService.ratePharmacy(reviewForm.value).subscribe({
      next: (data: any) => {
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'شكرا علي تقيمك !',
        });
        this.showReviewInput = false;
      },
      error: (err: any) => {
        let messageDetail = '';
        if (err.error.error === 'Not Authorized') {
          messageDetail = `${this.pharmacy.title} يرجي تسجيل الدخول لتقييم `;
        } else {
          messageDetail = `${this.pharmacy.title} لقد قمت بالفعل بتقييم `;
        }
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: messageDetail,
          styleClass: 'rtl-message',
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
