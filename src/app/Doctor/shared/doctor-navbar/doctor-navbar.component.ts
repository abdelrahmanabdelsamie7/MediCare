import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './doctor-navbar.component.html',
  styleUrls: ['./doctor-navbar.component.css'],
})
export class DoctorNavbarComponent implements OnInit, OnDestroy {
  doctor: IDoctor = {} as IDoctor;
  notifications: any[] = [];
  unreadCount: number = 0;
  audio = new Audio('assets/notification.wav');
  interval: any;
  selectedNotification: any = null; // لتمرير الإشعار المحدد
  isModalOpen: boolean = false; // لفتح وإغلاق الـ Modal
  private destroy$ = new Subject<void>();

  constructor(
    private _Router: Router,
    private _SDoctorService: SDoctorService,
    private renderer: Renderer2
  ) {}

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
          console.log(data);
          if (data.success) {
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
    this.audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });
  }
  makeNotificationReaded(notificationId: string) {
    this._SDoctorService.markNotificationAsRead(notificationId).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
  showModal(notification: any) {
    this.selectedNotification = notification;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
