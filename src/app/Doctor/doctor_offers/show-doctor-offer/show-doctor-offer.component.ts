import { Component } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { IDoctorOfferImages } from '../../../Core/interfaces/i-doctor-offer-images';
import { DiscountPipe } from '../../../Core/pipes/discount.pipe';
import { IDoctor } from '../../../Core/interfaces/i-doctor';

@Component({
  selector: 'app-show-doctor-offer',
  standalone: true,
  imports: [DiscountPipe, CommonModule],
  templateUrl: './show-doctor-offer.component.html',
  styleUrl: './show-doctor-offer.component.css',
})
export class ShowDoctorOfferComponent {
  id: string = '';
  DoctorOffer: IDoctorOffer = {} as IDoctorOffer;
  DoctorOfferImages: IDoctorOfferImages[] = [];
  Doctor: IDoctor = {} as IDoctor;
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this._SDoctorOfferService.showDoctorOffer(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.DoctorOffer = data.data;
        this.DoctorOfferImages = this.DoctorOffer.images;
        console.log(this.DoctorOfferImages);
        this.Doctor = this.DoctorOffer.doctor;
      },
    });
  }
  back() {
    this._Location.back();
  }
}
