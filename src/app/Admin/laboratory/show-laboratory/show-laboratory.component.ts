import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../Core/pipes/time-format.pipe';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-show-laboratory',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './show-laboratory.component.html',
  styleUrl: './show-laboratory.component.css',
})
export class ShowLaboratoryComponent implements OnInit, OnDestroy {
  isRtl:boolean=false
  id: string = '';
  Laboratory: ILaboratory = {} as ILaboratory;
  private destroy$ = new Subject<void>();
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location,
   private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadLaboratoryData();
    this.checkLanguageDirection();
  }
  loadLaboratoryData() {
    this._SLaboratoryService
      .showLaboratory(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Laboratory = data.data;
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
