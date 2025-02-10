import {
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SAdminService } from '../../../Core/services/s-admin.service';
import { IAdmin } from '../../../Core/interfaces/i-admin';
import { Subject } from 'rxjs';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent implements OnInit, OnDestroy {
  selectedLang: string = 'English';
  selectedIcon: string = 'fas fa-flag-usa';
  Admin: IAdmin = {} as IAdmin;
  private destroy$ = new Subject<void>();
  private readonly _STranslateService = inject(STranslateService);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _Router: Router,
    private _SAdminService: SAdminService,
    private renderer: Renderer2
  ) {
    this.loadLanguage();
  }
  ngOnInit() {
    this.loadAdminData();
  }
  loadAdminData() {
    this._SAdminService.adminAccount().subscribe({
      next: (data) => {
        // console.log(data);
        this.Admin = data;
      },
      error: (Err) => {
        console.log(Err);
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
  change(lang: string) {
    this._STranslateService.changeLang(lang);
    this.updateLanguage(lang);
  }

  private updateLanguage(lang: string) {
    if (lang === 'en') {
      this.selectedLang = 'English';
      this.selectedIcon = 'fas fa-flag-usa';
    } else if (lang === 'ar') {
      this.selectedLang = 'العربية';
      this.selectedIcon = 'fas fa-flag';
    }
  }

  private loadLanguage() {
    const lang = localStorage.getItem('lang') || 'ar';
    this.updateLanguage(lang);
  }
}
