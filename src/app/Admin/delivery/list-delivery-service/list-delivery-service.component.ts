import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-list-delivery-service',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule, NgStyle],
  templateUrl: './list-delivery-service.component.html',
  styleUrl: './list-delivery-service.component.css',
  providers: [MessageService],
})
export class ListDeliveryServiceComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  DeliveryServices: IDelivery[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDeliveryService: SDeliveryService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this.getDeliveryServices();
    this.checkLanguageDirection();
  }
  getDeliveryServices() {
    this._SDeliveryService
      .getDeliveryServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DeliveryServices = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDeliveryService(id: string) {
    this._SDeliveryService
      .deleteDeliverService(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DeliveryServices = this.DeliveryServices.filter(
            (obj: IDelivery) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Delivery Service Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete delivery service',
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
