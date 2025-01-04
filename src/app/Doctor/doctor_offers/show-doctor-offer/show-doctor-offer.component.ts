import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DiscountPipe } from '../../../Core/pipes/discount.pipe';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { IDoctorOfferImage } from '../../../Core/interfaces/i-doctor-offer-image';
@Component({
  selector: 'app-show-doctor-offer',
  standalone: true,
  imports: [
    DiscountPipe,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    RouterModule,
    Toast,
  ],
  templateUrl: './show-doctor-offer.component.html',
  styleUrl: './show-doctor-offer.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class ShowDoctorOfferComponent implements OnInit, OnDestroy {
  id: string = '';
  DoctorOffer: IDoctorOffer = {} as IDoctorOffer;
  DoctorOfferImages: IDoctorOfferImage[] = [];
  Doctor: IDoctor = {} as IDoctor;
  responsiveOptions: any[] | undefined;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _MessageService: MessageService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  ngOnInit() {
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
          this.Doctor = this.DoctorOffer.doctor;
        },
      });
  }
  deleteImageOffer(imageId: string) {
    this._SDoctorOfferService.deleteDoctorOfferImage(imageId).subscribe({
      next: () => {
        this.DoctorOfferImages = this.DoctorOfferImages.filter(
          (obj: IDoctorOfferImage) => obj.id !== imageId
        );
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Doctor Offer Image Delelted Successfully',
        });
      },
    });
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
