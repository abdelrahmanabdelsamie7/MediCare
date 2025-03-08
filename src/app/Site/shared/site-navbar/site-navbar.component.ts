import { isPlatformBrowser, NgStyle } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-site-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule,NgStyle],
  templateUrl: './site-navbar.component.html',
  styleUrl: './site-navbar.component.css',
})
export class SiteNavbarComponent implements OnInit {
  isRtl: boolean = false;
  selectedLang: string = 'English';
  selectedIcon: string = './images/americanFlag.png';
  isAuth: boolean = false;
  private readonly _STranslateService = inject(STranslateService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadLanguage();
  }
  ngOnInit(): void {
  this.checkLanguageDirection();
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
    this._STranslateService.currentLang$.subscribe((lang) => {
      this.isRtl = lang === 'ar';
      this.selectedLang = lang === 'ar' ? 'العربية' : 'English';
      this.selectedIcon = lang === 'ar' ? './images/egyptFlag.png' : './images/americanFlag.png';
    });
  }

  private loadLanguage() {
    const lang = localStorage.getItem('lang') || 'ar';
    this.updateLanguage(lang);
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next:(lang)=>{
        if(lang==='ar'){
          this.isRtl=true
        }else{
          this.isRtl=false
        }
      }
    })
  }
}
