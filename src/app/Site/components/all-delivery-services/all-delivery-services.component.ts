import { Component, OnInit, signal } from '@angular/core';
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { Subject, takeUntil } from 'rxjs';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-delivery-services',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './all-delivery-services.component.html',
  styleUrl: './all-delivery-services.component.css',
})
export class AllDeliveryServicesComponent implements OnInit {
  deliveryServices: IDelivery[] = [];
  isFetching = signal<boolean>(false);
  private destroy$ = new Subject<void>();
  constructor(private _SDeliveryService: SDeliveryService) { }
  ngOnInit(): void {
    this.isFetching.set(true);
    this._SDeliveryService
      .getDeliveryServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.deliveryServices = data.data;
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error loading delivery services:', err);
        }
      });
  }
}
