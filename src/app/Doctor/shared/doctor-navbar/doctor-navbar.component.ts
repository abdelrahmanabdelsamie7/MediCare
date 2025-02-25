import { TranslateModule } from '@ngx-translate/core';
import {
  Component,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, RouterModule, TranslateModule],
  templateUrl: './doctor-navbar.component.html',
  styleUrls: ['./doctor-navbar.component.css'],
})
export class DoctorNavbarComponent implements OnInit, OnDestroy {
  selectedLang: string = 'English';
  selectedIcon: string = 'americanFlag.png';
  doctor: IDoctor = {} as IDoctor;
  notifications: any[] = [];
  unreadCount: number = 0;
  audio = new Audio('assets/notification.wav');
  interval: any;
  selectedNotification: any = null;
  isModalOpen: boolean = false;
  private destroy$ = new Subject<void>();
  private readonly _STranslateService = inject(STranslateService);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Router: Router,
    private _SDoctorService: SDoctorService,
    private renderer: Renderer2
  ) {
    this.loadLanguage();
  }
  ngOnInit() {
    this.loadDoctorData();
    this.loadNotifications();
  }
  loadDoctorData() {
    this._SDoctorService
      .doctorAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.doctor = data;
          localStorage.setItem('doctorId', data.id);
        },
      });
  }
  loadNotifications() {
    const doctorId = localStorage.getItem('doctorId');
    if (doctorId) {
      this._SDoctorService.getDoctorNotifications(doctorId).subscribe({
        next: (data) => {
          if (data.success) {
            console.log(data);

            const newNotifications = data.data.filter((n: any) => !n.read_at);
            if (newNotifications.length > this.unreadCount) {
              this.playNotificationSound();
            }
            this.notifications = data.data;
            this.unreadCount = newNotifications.length;
          }
        },
        error: (err) => console.error('Error loading notifications:', err),
      });
    }
  }
  playNotificationSound() {
    setTimeout(() => {
      this.audio
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }, 1000);
  }
  makeNotificationReaded(notificationId: string) {
    this._SDoctorService.markNotificationAsRead(notificationId).subscribe({
      next: (data) => {
      },
    });
  }
  showModal(id: string) {

  }
  ngAfterViewInit(): void {
    this.attachToggleEvent();
  }
  attachToggleEvent(): void {
    const toggleButton = document.querySelector('.toggle-sidebar-btn');
    const bodyElement = document.querySelector('body');
    if (toggleButton && bodyElement) {
      this.renderer.listen(toggleButton, 'click', () => {
        bodyElement.classList.toggle('toggle-sidebar');
      });
    } else {
      if (!toggleButton) {
        console.error('Toggle button not found');
      }
      if (!bodyElement) {
        console.error('Body element not found');
      }
    }
  }
  toggleSidebar(): void {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.toggle('toggle-sidebar');
    } else {
      console.error('Body element not found');
    }
  }
  logOut() {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorId');
    this._Router.navigateByUrl('/doctor-login');
  }
  change(lang: string) {
    this._STranslateService.changeLang(lang);
    this.updateLanguage(lang);
  }
  private updateLanguage(lang: string) {
    if (lang === 'en') {
      this.selectedLang = 'English';
      this.selectedIcon = 'americanFlag.png';
    } else if (lang === 'ar') {
      this.selectedLang = 'العربية';
      this.selectedIcon = 'egyptFlag.png';
    }
  }
  private loadLanguage() {
    const lang = localStorage.getItem('lang') || 'ar';
    this.updateLanguage(lang);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
