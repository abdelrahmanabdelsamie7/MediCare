import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SAdminService } from '../../../Core/services/s-admin.service';
import { IAdmin } from '../../../Core/interfaces/i-admin';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent implements OnInit, OnDestroy {
  Admin: IAdmin = {} as IAdmin;
  private destroy$ = new Subject<void>();
  constructor(
    private _Router: Router,
    private _SAdminService: SAdminService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loadAdminData();
  }
  loadAdminData() {
    this._SAdminService
      .adminAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.Admin = data;
        },
      });
  }
  logOut() {
    localStorage.removeItem('adminToken');
    this._Router.navigateByUrl('/admin-login');
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
