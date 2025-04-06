import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { IDoctorOfferImage } from '../../../Core/interfaces/i-doctor-offer-image';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { CommonModule, DatePipe } from '@angular/common';
import { DiscountPipe } from '../../../Core/pipes/discount.pipe';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-details-doctor-offer',
  standalone: true,
  imports: [CommonModule, DiscountPipe, RouterModule, TimeFormatPipe, TranslateModule],
  templateUrl: './details-doctor-offer.component.html',
  styleUrl: './details-doctor-offer.component.css',
  providers: [DatePipe]
})
export class DetailsDoctorOfferComponent implements OnInit, OnDestroy {
  isRtl: boolean = false
  id: string = '';
  selectedImage: string = "";
  DoctorOffer: IDoctorOffer = {} as IDoctorOffer;
  appointmentDates: any[] = [];
  DoctorOfferImages: IDoctorOfferImage[] = [];
  Doctor: IDoctor = {} as IDoctor;
  DoctorClinics: IDoctorClinic[] = [];
  offerGroup: IOfferGroup = {} as IOfferGroup;
  responsiveOptions: any[] | undefined;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _ActivatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private _STranslateService: STranslateService
  ) {
  }
  ngOnInit() {
    this.checkLanguageDirection()
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },

    });
    this.loadDoctorOfferData();
  }
  loadDoctorOfferData() {
    this._SDoctorOfferService
      .showDoctorOffer(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorOffer = data.data;
          this.DoctorOfferImages = this.DoctorOffer.images;
          this.appointmentDates = data.data.appointmentsGroupedByDate;
          if (data.data.appointmentsGroupedByDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            this.appointmentDates = Object.keys(
              data.data.appointmentsGroupedByDate
            )
              .filter((date: string) => {
                const appointmentDate = new Date(date);
                appointmentDate.setHours(0, 0, 0, 0);
                return appointmentDate >= today;
              })
              .map((date: string) => ({
                date,
                appointments: data.data.appointmentsGroupedByDate[date],
              }));
          } else {
            console.log('No appointments data available.');
          }
          this.offerGroup = this.DoctorOffer.offer_group;
          this.Doctor = this.DoctorOffer.doctor;
          this.DoctorClinics = this.Doctor.clinics;
          this.selectedImage = this.DoctorOfferImages[0].image;

        },
      });
  }
  changeImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
  getFormattedDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'EEEE d MMM');
    if (formattedDate) {
      const [day, dayNumber, month] = formattedDate.split(' ');
      return `${this.translate.instant(
        'appointmentDays.' + day
      )} ${dayNumber} ${this.translate.instant('appointmentMonths.' + month)}`;
    }
    return '';
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
        if (lang === 'ar') {
          this.isRtl = true
        } else {
          this.isRtl = false
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
