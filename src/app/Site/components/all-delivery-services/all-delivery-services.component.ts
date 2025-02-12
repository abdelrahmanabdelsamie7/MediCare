import { Component, OnInit } from '@angular/core';
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { Subject, takeUntil } from 'rxjs';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';

@Component({
  selector: 'app-all-delivery-services',
  standalone: true,
  imports: [],
  templateUrl: './all-delivery-services.component.html',
  styleUrl: './all-delivery-services.component.css',
})
export class AllDeliveryServicesComponent implements OnInit {
  deliveryServices: IDelivery[] = [];
  private destroy$ = new Subject<void>();
  constructor(private _SDeliveryService: SDeliveryService) {}
  ngOnInit(): void {
    this._SDeliveryService
      .getDeliveryServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.deliveryServices = data.data;
        },
      });
  }
}
