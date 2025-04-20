import { Component, OnInit } from '@angular/core';
import { SContactUsService } from '../../../Core/services/s-contact-us.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-contact',
  standalone: true,
  imports: [Toast, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './reply-contact.component.html',
  styleUrl: './reply-contact.component.css',
  providers: [MessageService],
})
export class ReplyContactComponent implements OnInit {
  isRtl: boolean = false;
  id: string = ''
  constructor(
    private SContactUsService: SContactUsService,
    private messageService: MessageService,
    private _STranslateService: STranslateService,
    private _ActivatedRoute: ActivatedRoute
  ) { }
  replyToContactForm = new FormGroup({
    reply: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),

  });
  replyToContact(replyToContactForm: FormGroup) {
    this.SContactUsService
      .replyToContact(this.id, replyToContactForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Reply To Contact Successfully',
          });
          replyToContactForm.reset();
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
    this._ActivatedRoute.paramMap.subscribe({
      next: (params: any) => {
        this.id = params.get('id') || ''
        console.log(this.id);

      }
    })
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}