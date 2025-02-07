import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class STranslateService {
private readonly _TranslateService= inject( TranslateService)
  constructor() {
    //1-get lang local -- words
    let saveLang = localStorage.getItem('lang') || 'ar';//lang->select (en , ar)
  //2-setDefault Lang
this._TranslateService.setDefaultLang('ar')
//3-use lang-->local
this._TranslateService.use(saveLang !)

//Direction ---->en->ltr  , ar->rtl
//this.changeDirection()
}

// changeDirection():void{
//   let saveLang = localStorage.getItem('lang')
//   if(saveLang==='en')  {// dir->ltr
//     document.documentElement.dir ='ltr'
//     }else if(saveLang==='ar'){// dir->rtl
//     document.documentElement.dir ='rtl'
//     }
// }
changeLang(lang:string):void{
  localStorage.setItem('lang', lang) //save in local
  this._TranslateService.use(lang)
  //this.changeDirection()
}
}
