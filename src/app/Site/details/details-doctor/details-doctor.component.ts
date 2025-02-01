import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { CarouselModule } from 'primeng/carousel';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
@Component({
  selector: 'app-details-doctor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    SliderModule,
    CarouselModule,

  ],
  templateUrl: './details-doctor.component.html',
  styleUrl: './details-doctor.component.css',
  providers: [MessageService],
})
export class DetailsDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  stars = [1, 2, 3, 4, 5];
  showReviewInput: boolean = false;
  ratesOfDoctor: any[] = [];
  filteredAppointments: any[] = [];
  priceRange: number[] = [200, 800];
  Doctor: IDoctor = {} as IDoctor;
  clinicImages: any[] = [];
  private destroy$ = new Subject<void>();
  groupedAppointments: { day: string; appointments: any[] }[] = [];
  reviewForm = new FormGroup({
    rating_value: new FormControl(0, [Validators.required, Validators.min(1)]),
    review: new FormControl('', [Validators.required]),
    user_id: new FormControl(localStorage.getItem('userId'), [
      Validators.required,
    ]),
    doctor_id: new FormControl(`${this.id}`, [Validators.required]),
  });
  constructor(
    private _SDoctorService: SDoctorService,
    private _ActivatedRoute: ActivatedRoute,
    private _MessageService: MessageService
  ) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.reviewForm.patchValue({ doctor_id: this.id });
  }

  filterAppointments(clinicId: string): void {
    this.filteredAppointments = this.Doctor.appiontments.filter(
      (app) => app.clinic_id === clinicId
    );
  }
  toggleReviewInput(): void {
    this.showReviewInput = !this.showReviewInput;
  }
  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating_value: rating });
  }
  getStarArray() {
    const rating = Math.floor(this.Doctor.avg_rate);
    if (isNaN(rating) || rating < 0) {
      return [];
    }
    return new Array(rating);
  }
  ngOnInit() {
    this.loadDoctorData();

  }
  loadDoctorData() {
    this._SDoctorService
      .showDoctor(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Doctor = data.data;
          const grouped = this.Doctor.appiontments.reduce(
            (acc: any, appointment) => {
              const day = appointment.day;
              if (!acc[day]) {
                acc[day] = [];
              }
              acc[day].push(appointment);
              return acc;
            },
            {}
          );
          this.groupedAppointments = Object.keys(grouped).map((day) => ({
            day,
            appointments: grouped[day],
          }));
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

  // submitReview(reviewForm: FormGroup): void {
  //   this._SDoctorService.rateDoctor(reviewForm.value).subscribe({
  //     next: (data) => {
  //       this._MessageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: 'شكرا علي تقيمك !',
  //       });
  //       this.showReviewInput = false;
  //     },
  //     error: (err) => {
  //       this._MessageService.add({
  //         severity: 'error',
  //         summary: 'error',
  //         detail: `لقد قمت بالفعل بتقيم ${this.Doctor.title} `,
  //       });
  //     },
  //   });
  // }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
