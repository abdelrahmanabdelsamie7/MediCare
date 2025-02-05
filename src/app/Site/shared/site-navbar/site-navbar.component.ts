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
  isAuth: boolean = false;
  private readonly _STranslateService =inject(STranslateService)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    }
  }
  change(lang:string):void{
this._STranslateService.changeLang(lang)
  }
}
