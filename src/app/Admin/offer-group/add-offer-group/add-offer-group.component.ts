import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-add-offer-group',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule ,  Toast , TranslateModule],
  templateUrl: './add-offer-group.component.html',
  styleUrl: './add-offer-group.component.css',
  providers:[MessageService]
})
export class AddOfferGroupComponent implements OnInit {
  isRtl:boolean=false;
constructor(
    private SOfferGroupService:SOfferGroupService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  addOfferGroupForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.maxLength(2048),
    ]),
  });
  addOfferGroup(addOfferGroupForm: FormGroup) {
    this.SOfferGroupService
      .addOfferGroup(addOfferGroupForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Offer Group Added Successfully',
          });
          addOfferGroupForm.reset();
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
