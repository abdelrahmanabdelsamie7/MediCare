import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { Subject, takeUntil } from 'rxjs';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-offer-group',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './show-offer-group.component.html',
  styleUrl: './show-offer-group.component.css'
})
export class ShowOfferGroupComponent implements OnInit, OnDestroy {
  id: string = '';
  OffersOfGroup: IDoctorOffer[] = [];
  private destroy$ = new Subject<void>();
  OfferGroup: IOfferGroup = {} as IOfferGroup;
  constructor(
    private _SOfferGroupService: SOfferGroupService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) { }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadOfferGroups();
  }
  loadOfferGroups() {
    this._SOfferGroupService
      .showOfferGroup(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
         this.OfferGroup = data.data ; 
          this.OffersOfGroup = this.OfferGroup.doctor_offers ; 
        },
      });
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}