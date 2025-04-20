import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ContactUs } from '../../../Core/interfaces/contact-us';
import { Subject, takeUntil } from 'rxjs';
import { SContactUsService } from '../../../Core/services/s-contact-us.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [Toast, CommonModule, TranslateModule, RouterModule],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css',
  providers: [MessageService],
})
export class ListContactComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  contactData = signal<ContactUs[]>([]);
  specificContact = signal<ContactUs>({
    id: '',
    name: '',
    email: '',
    message: '',
    reply: '',
    created_at: ''
  });
  private destroy$ = new Subject<void>();
  constructor(
    private _SContactUsService: SContactUsService,
    private _MessageService: MessageService,
    private translate: STranslateService
  ) { }
  ngOnInit() {
    this.getContactData();
    this.checkLanguageDirection();
  }
  getContactData() {
    this._SContactUsService
      .getAllContactData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.contactData.set(data.data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  ShowSpecificContactData(id: string) {
    this._SContactUsService.showContactUs(id).subscribe({
      next: (res: any) => {
        this.specificContact.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
  deleteContactData(id: string) {
    this._SContactUsService.deleteContactUs(id).subscribe({
      next: (res) => {
        this.contactData.update((prev) => prev.filter((item) => item.id !== id));
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contact Us Deleted Successfully',
        });
        this.getContactData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  checkLanguageDirection(): void {
    this.translate.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
