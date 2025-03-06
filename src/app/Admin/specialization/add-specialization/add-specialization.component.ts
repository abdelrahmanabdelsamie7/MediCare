import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-specialization.component.html',
  styleUrl: './add-specialization.component.css',
  providers: [MessageService],
})
export class AddSpecializationComponent implements OnInit {
  isRtl:boolean=false;
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private messageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  // Form For Adding Specialization
  addSpecializationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addSpecialization(addSpecializationForm: FormGroup) {
    this._SSpeicalizationService
      .addSpecialization(addSpecializationForm.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Specialization Added Successfully',
          });
          addSpecializationForm.reset();
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
    this. checkLanguageDirection();
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
