import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-show-pharmacy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './show-pharmacy.component.html',
  styleUrl: './show-pharmacy.component.css',
})
export class ShowPharmacyComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  id: string = '';
  pharmacy: IPharmacy = {} as IPharmacy;
  private destroy$ = new Subject<void>();
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadPharmacyData();
    this.checkLanguageDirection();
  }
  loadPharmacyData() {
    this._SPharmacyService
      .showPharmacy(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.pharmacy = data.data;
        },
      });
  }
  back() {
    this._Location.back();
  }
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
