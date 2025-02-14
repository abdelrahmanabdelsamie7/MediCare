import { Component, OnInit } from '@angular/core';
import { SDoctorOfferService } from '../../../Core/services/s-doctor-offer.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';

@Component({
  selector: 'app-add-doctor-offer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-doctor-offer.component.html',
  styleUrl: './add-doctor-offer.component.css',
  providers: [MessageService],
})
export class AddDoctorOfferComponent implements OnInit{
  offerGroups :IOfferGroup[]=[] ;
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
    private _SOfferGroupService:SOfferGroupService , 
    private messageService: MessageService
  ) {}
  addDoctorOfferForm = new FormGroup({
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
    price_before_discount: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    from_day: new FormControl('', [Validators.required]),
    to_day: new FormControl('', [Validators.required]),
    doctor_id: new FormControl(localStorage.getItem('doctorId'), [
      Validators.required,
    ]),
    offer_group_id: new FormControl('', [
      Validators.required,
    ]),
  });
  ngOnInit() {
    this.loadOfferGroup();
   }
  loadOfferGroup(){
    this._SOfferGroupService.getOfferGroups().subscribe({
      next:(data:any)=>{
        this.offerGroups = data.data ; 
      }
    })
  }
  addDoctorOffer(addDoctorOfferForm: FormGroup) {
    this._SDoctorOfferService
      .addDoctorOffer(addDoctorOfferForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor Offer Added Successfully',
          });
          addDoctorOfferForm.reset();
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
}
