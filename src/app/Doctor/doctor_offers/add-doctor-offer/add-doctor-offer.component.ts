import { Component } from '@angular/core';
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

@Component({
  selector: 'app-add-doctor-offer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-doctor-offer.component.html',
  styleUrl: './add-doctor-offer.component.css',
  providers: [MessageService],
})
export class AddDoctorOfferComponent {
  constructor(
    private _SDoctorOfferService: SDoctorOfferService,
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
  });
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
