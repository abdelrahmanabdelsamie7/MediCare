import { Component, OnDestroy, OnInit } from '@angular/core';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-doctor-offer-image',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-doctor-offer-image.component.html',
  styleUrl: './add-doctor-offer-image.component.css',
  providers: [MessageService],
})
export class AddDoctorOfferImageComponent implements OnInit, OnDestroy {
  DoctorOffers: IDoctorOffer[] = [];
  private destroy$ = new Subject<void>();
  addDoctorOfferImageForm = new FormGroup({
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    doctor_offer_id: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private messageService: MessageService,
    private _Location: Location
  ) {}
  ngOnInit(): void {
    this.loadDoctorOffers();
  }
  loadDoctorOffers() {
    this._SDoctorOfferService
      .getDoctorOffers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorOffers = data.data;
        },
      });
  }
  addDoctorOfferImage(addDoctorOfferImageForm: FormGroup) {
    this._SDoctorOfferService
      .addDoctorOfferImage(addDoctorOfferImageForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Offer Image Added Successfully',
          });
          addDoctorOfferImageForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `${err.error.message}`,
          });
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