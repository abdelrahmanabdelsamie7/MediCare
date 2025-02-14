import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { IDoctorOfferImage } from '../../../Core/interfaces/i-doctor-offer-image';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details-doctor-offer',
  standalone: true,
  imports: [],
  templateUrl: './details-doctor-offer.component.html',
  styleUrl: './details-doctor-offer.component.css'
})
export class DetailsDoctorOfferComponent implements OnInit, OnDestroy {
  id: string = '';
  DoctorOffer: IDoctorOffer = {} as IDoctorOffer;
  DoctorOfferImages: IDoctorOfferImage[] = [];
  Doctor: IDoctor = {} as IDoctor;
  responsiveOptions: any[] | undefined;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _ActivatedRoute: ActivatedRoute,
  ) {
    console.log("Hamada One");
    
  }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },

    });
    console.log(this.id);
    
    this.loadDoctorOfferData();
  }
  loadDoctorOfferData() {
    this._SDoctorOfferService
      .showDoctorOffer(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          // this.DoctorOffer = data.data;
          // this.DoctorOfferImages = this.DoctorOffer.images;
          // this.Doctor = this.DoctorOffer.doctor;
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}