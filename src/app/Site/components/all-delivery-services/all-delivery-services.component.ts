import { Component, OnInit } from '@angular/core';
import { SiteNavbarComponent } from "../../shared/site-navbar/site-navbar.component";
import { SiteFooterComponent } from "../../shared/site-footer/site-footer.component";
import { IDelivery } from '../../../Core/interfaces/i-delivery';
import { Subject, takeUntil } from 'rxjs';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';

@Component({
  selector: 'app-all-delivery-services',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent],
  templateUrl: './all-delivery-services.component.html',
  styleUrl: './all-delivery-services.component.css'
})
export class AllDeliveryServicesComponent  implements OnInit{
deliveryServices: IDelivery[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDeliveryService: SDeliveryService
  ) {}
  ngOnInit(): void {
this._SDeliveryService
      .getDeliveryServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('deliveryServices', data);
          this.deliveryServices = data.data;
        },
      });
  }
  }
