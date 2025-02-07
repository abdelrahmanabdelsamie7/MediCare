import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-site-navbar',
  standalone: true,
  imports: [RouterModule ,TranslateModule],
  templateUrl: './site-navbar.component.html',
  styleUrl: './site-navbar.component.css',
})
export class SiteNavbarComponent implements OnInit {
  selectedLang: string = 'English';
  selectedIcon: string = 'fas fa-flag-usa';
  isAuth: boolean = false;
  private readonly _STranslateService =inject(STranslateService)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadLanguage();}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
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
