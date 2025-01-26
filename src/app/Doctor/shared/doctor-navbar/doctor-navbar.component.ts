import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css',
})
export class DoctorNavbarComponent implements OnInit, OnDestroy {
  doctor: IDoctor = {} as IDoctor;
  private destroy$ = new Subject<void>();
  constructor(
    private _Router: Router,
    private _SDoctorService: SDoctorService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loaddoctorData();
  }
  loaddoctorData() {
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
  logOut() {
    localStorage.removeItem('doctorToken');
    this._Router.navigateByUrl('/doctor-login');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
}
