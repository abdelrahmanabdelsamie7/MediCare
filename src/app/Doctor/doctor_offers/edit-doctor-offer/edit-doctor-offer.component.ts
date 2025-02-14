import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorOffer } from '../../../Core/interfaces/i-doctor-offer';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';

@Component({
  selector: 'app-edit-doctor-offer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './edit-doctor-offer.component.html',
  styleUrl: './edit-doctor-offer.component.css',
  providers: [MessageService],
})
export class EditDoctorOfferComponent implements OnInit, OnDestroy {
  id: string = '';
  offerGroups:IOfferGroup[]=[] ; 
  DoctorOffer: IDoctorOffer = {} as IDoctorOffer;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _SOfferGroupService:SOfferGroupService , 
    private _Location: Location
  ) {}
  editDoctorOfferForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    info_about_offer: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price_before_discount: new FormControl(0, [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    from_day: new FormControl<Date | null>(null, [Validators.required]),
    to_day: new FormControl<Date | null>(null, [Validators.required]),
    doctor_id: new FormControl(localStorage.getItem('doctorId'), [
      Validators.required,
    ]),
    offer_group_id: new FormControl('', [
      Validators.required,
    ]),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorOfferData();
    this.loadOfferGroup();
  }
  loadOfferGroup() {
    this._SOfferGroupService.getOfferGroups().subscribe({
      next: (data: any) => {
        this.offerGroups = data.data;
      }
    })
  }
  loadDoctorOfferData() {
    this._SDoctorOfferService
      .showDoctorOffer(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {    
          this.DoctorOffer = data.data;
          this.editDoctorOfferForm.patchValue({
            title: this.DoctorOffer.title,
            info_about_offer: this.DoctorOffer.info_about_offer,
            details: this.DoctorOffer.details,
            price_before_discount: this.DoctorOffer.price_before_discount,
            discount: this.DoctorOffer.discount,
            from_day: this.DoctorOffer.from_day,
            to_day: this.DoctorOffer.to_day,
            offer_group_id : this.DoctorOffer.offer_group_id
          });
        },
      });
  }
  editDoctorOffer(editDoctorOfferForm: FormGroup) {
    if (this.editDoctorOfferForm.invalid) return;
    this._SDoctorOfferService
      .editDoctorOffer(this.id, editDoctorOfferForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Offer Edited Successfully',
          });
          editDoctorOfferForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Doctor Offer Couldn't Be Edited" + err.error.message,
          });
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
