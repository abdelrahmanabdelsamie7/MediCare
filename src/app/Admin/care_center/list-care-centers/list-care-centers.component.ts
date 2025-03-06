import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { Subject, takeUntil } from 'rxjs';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-care-centers',
  standalone: true,
  imports: [Toast, RouterModule,TranslateModule,CommonModule],
  templateUrl: './list-care-centers.component.html',
  styleUrl: './list-care-centers.component.css',
  providers: [MessageService],
})
export class ListCareCentersComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  careCenters: ICareCenter[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SCareCenterService: SCareCenterService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.getCareCenters();
    this.checkLanguageDirection();
  }
  getCareCenters() {
    this._SCareCenterService
      .getCareCenters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.careCenters = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteCareCenter(id: string) {
    this._SCareCenterService
      .deleteCareCenter(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.careCenters = this.careCenters.filter(
            (obj: ICareCenter) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Care Center Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Care Center',
          });
        },
      });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
