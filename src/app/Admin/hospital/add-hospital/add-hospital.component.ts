import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CustomFormsModule, CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-add-hospital',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-hospital.component.html',
  styleUrl: './add-hospital.component.css',
  providers: [MessageService],
})
export class AddHospitalComponent {
  constructor(
    private _SHospitalService: SHospitalService,
    private messageService: MessageService
  ) {}
  addHospitalForm = new FormGroup({
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
  ngOnInit() {}

  addHospital(addHospitalForm: FormGroup) {
    this._SHospitalService.addHospital(addHospitalForm.value).subscribe({
      next: (data) => {},
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Hospital Added Successfully',
    });
  }
}
