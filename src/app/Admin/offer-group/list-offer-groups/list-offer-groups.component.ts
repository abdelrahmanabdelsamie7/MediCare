import { Component, OnDestroy, OnInit } from '@angular/core';
import { IOfferGroup } from '../../../Core/interfaces/i-offer-group';
import { Subject, takeUntil } from 'rxjs';
import { SOfferGroupService } from '../../../Core/services/s-offer-group.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-list-offer-groups',
  standalone: true,
  imports: [Toast , TranslateModule,RouterModule,NgStyle],
  templateUrl: './list-offer-groups.component.html',
  styleUrl: './list-offer-groups.component.css' ,
  providers:[MessageService]
})
export class ListOfferGroupsComponent implements OnInit , OnDestroy{
  isRtl:boolean=false;
OfferGroups: IOfferGroup[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SOfferGroupService: SOfferGroupService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.getOfferGroups();
    this.checkLanguageDirection();
  }
  getOfferGroups() {
    this._SOfferGroupService
      .getOfferGroups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.OfferGroups = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteOfferGroups(id: string) {
    this._SOfferGroupService
      .deleteOfferGroup(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.OfferGroups = this.OfferGroups.filter(
            (obj: IOfferGroup) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Offer Group Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Offer Group',
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
