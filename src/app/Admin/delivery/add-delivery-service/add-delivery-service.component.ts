import { Component, OnInit } from '@angular/core';
import { SDeliveryService } from '../../../Core/services/s-delivery.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-add-delivery-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-delivery-service.component.html',
  styleUrl: './add-delivery-service.component.css',
  providers: [MessageService],
})
export class AddDeliveryServiceComponent implements OnInit{
  isRtl:boolean=false;
  constructor(
    private _SDeliveryService: SDeliveryService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  addDeliveryServiceForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    app_link: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addDeliveryService(addDeliveryServiceForm: FormGroup) {
    this._SDeliveryService
      .addDeliveryService(addDeliveryServiceForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: ' add Delivery Service Added Successfully',
          });
          addDeliveryServiceForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `${err.error.message}`,
          });
        },
      });
  }
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
