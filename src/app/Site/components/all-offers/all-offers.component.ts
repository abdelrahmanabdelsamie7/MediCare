import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { Subject, takeUntil } from 'rxjs';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DiscountPipe } from '../../../Core/pipes/discount.pipe';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-offers',
  standalone: true,
  imports: [RouterModule , DiscountPipe , CommonModule ,TranslateModule],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.css'
})
export class AllOffersComponent implements OnInit, OnDestroy {
  id: string = '';
  OffersOfGroup: IDoctorOffer[] = [];
  private destroy$ = new Subject<void>();
  OfferGroup: IOfferGroup = {} as IOfferGroup;
  constructor(
    private _SOfferGroupService: SOfferGroupService,
    private _ActivatedRoute: ActivatedRoute,
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
          console.log(data);
          this.OfferGroup = data.data;
          this.OffersOfGroup = this.OfferGroup.doctor_offers;
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
