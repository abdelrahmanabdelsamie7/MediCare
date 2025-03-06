import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CustomValidators } from 'ng2-validation';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-hospital',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-hospital.component.html',
  styleUrl: './add-hospital.component.css',
  providers: [MessageService],
})
export class AddHospitalComponent implements OnInit{
  isRtl:boolean=false
  constructor(
    private _SHospitalService: SHospitalService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
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
  addHospital(addHospitalForm: FormGroup) {
    this._SHospitalService.addHospital(addHospitalForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Hospital Added Successfully',
        });
        addHospitalForm.reset();
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
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({ next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
