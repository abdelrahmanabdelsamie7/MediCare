import { Component } from '@angular/core';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-add-care-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-care-center.component.html',
  styleUrl: './add-care-center.component.css',
  providers: [MessageService],
})
export class AddCareCenterComponent {
  constructor(
    private _SCareCenterService: SCareCenterService,
    private messageService: MessageService
  ) {}
  // Form Of Adding Care Center
  addCareCenterForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    service: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    locationUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
  });
  // Function Of Adding Care Center
  addCareCenter(addCareCenterForm: FormGroup) {
    this._SCareCenterService.addCareCenter(addCareCenterForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Care Center Added Successfully',
        });
        addCareCenterForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
