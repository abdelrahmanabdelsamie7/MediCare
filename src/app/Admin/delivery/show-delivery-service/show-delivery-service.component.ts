import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Location } from '@angular/common';

@Component({
  selector: 'app-show-delivery-service',
  standalone: true,
  imports: [],
  templateUrl: './show-delivery-service.component.html',
  styleUrl: './show-delivery-service.component.css'
})
export class ShowDeliveryServiceComponent implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  deliveryService: IDelivery = {} as IDelivery;
  constructor(
    private _SDeliveryService: SDeliveryService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this. loadDeliveryServiceData() ;
  }
  loadDeliveryServiceData() {
    this._SDeliveryService
      .showDeliverService(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.deliveryService = data.data;
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
