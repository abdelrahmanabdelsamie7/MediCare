import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class STranslateService {
private readonly _TranslateService= inject( TranslateService)
  private langSubject = new BehaviorSubject<string>(localStorage.getItem('lang') || 'ar');
  currentLang$ = this.langSubject.asObservable();
  constructor() {
    let saveLang = localStorage.getItem('lang') || 'ar'; //lang->select (en , ar)
    //2-setDefault Lang
    this._TranslateService.setDefaultLang('ar');
    this._TranslateService.use(saveLang);
    // this.changeDirection(saveLang);
  }
  changeLang(lang: string): void {
    localStorage.setItem('lang', lang); //save local
    this._TranslateService.use(lang); // use lang-->local
    this.langSubject.next(lang); // تحديث لكل
    // this.changeDirection(lang);
  }
//Direction ---->en->ltr  , ar->rtl
  // private changeDirection(lang: string): void {
  //   if (lang === 'ar') {
  //     document.documentElement.dir = 'rtl';
  //   } else {
  //     document.documentElement.dir = 'ltr';
  //   }
  // }
}
