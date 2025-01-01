import { Component } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-list-doctor-offers',
  standalone: true,
  imports: [RouterModule, Toast],
  templateUrl: './list-doctor-offers.component.html',
  styleUrl: './list-doctor-offers.component.css',
  providers: [MessageService],
})
export class ListDoctorOffersComponent {
  DoctorOffers: IDoctorOffer[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getDoctorOffers();
  }
  getDoctorOffers() {
    this._SDoctorOfferService
      .getDoctorOffers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.DoctorOffers = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDoctorOffer(id: string) {
    this._SDoctorOfferService
      .deleteDoctorOffer(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DoctorOffers = this.DoctorOffers.filter(
            (obj: IDoctorOffer) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Offer Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Doctor Offer',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
