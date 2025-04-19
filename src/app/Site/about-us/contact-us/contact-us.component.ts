import { Component } from '@angular/core';
import { SContactUsService } from '../../../Core/services/s-contact-us.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [Toast, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  providers: [MessageService]
})
export class ContactUsComponent {
  isRtl: boolean = false
  constructor(
    private SContactUsService: SContactUsService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) { }
  addContactData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
  });
  addContact(addContactData: FormGroup) {
    this.SContactUsService
      .addContactUs(addContactData.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: 'شكرا علي تواصلك معانا',
          });
          addContactData.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'حدث خطا ما',
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
