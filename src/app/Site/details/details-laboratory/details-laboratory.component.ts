import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
@Component({
  selector: 'app-details-laboratory',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './details-laboratory.component.html',
  styleUrl: './details-laboratory.component.css',
  providers: [MessageService],
})
export class DetailsLaboratoryComponent implements OnInit, OnDestroy {
  id: string = '';
  isAuth: boolean = false;
  stars = [1, 2, 3, 4, 5];
  showReviewInput: boolean = false;
  ratesOfLaboratory: any[] = [];
  Laboratory: ILaboratory = {} as ILaboratory;
  private destroy$ = new Subject<void>();
  reviewForm = new FormGroup({
    rating_value: new FormControl(0, [Validators.required, Validators.min(1)]),
    review: new FormControl('', [Validators.required]),
    user_id: new FormControl(localStorage.getItem('userId'), [
      Validators.required,
    ]),
    laboratory_id: new FormControl(`${this.id}`, [Validators.required]),
  });
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _ActivatedRoute: ActivatedRoute,
    private _MessageService: MessageService
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.reviewForm.patchValue({ laboratory_id: this.id });
  }
  toggleReviewInput(): void {
    this.showReviewInput = !this.showReviewInput;
  }
  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating_value: rating });
  }
  getStarArray() {
    const rating = Math.floor(this.Laboratory.avg_rate);
    if (isNaN(rating) || rating < 0) {
      return [];
    }
    return new Array(rating);
  }
  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.isAuth = true;
    }
    this.loadLaboratoryData();
  }
  loadLaboratoryData() {
    this._SLaboratoryService
      .showLaboratory(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Laboratory = data.data;
          this.ratesOfLaboratory = data.data.users;
        },
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
    this._SLaboratoryService.rateLaboratory(reviewForm.value).subscribe({
      next: (data) => {
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
          messageDetail = `${this.Laboratory.title} يرجي تسجيل الدخول لتقييم `;
        } else {
          messageDetail = `${this.Laboratory.title} لقد قمت بالفعل بتقييم `;
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
