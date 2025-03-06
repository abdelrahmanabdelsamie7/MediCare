import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { Subject, takeUntil } from 'rxjs';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-list-chain-pharmacies',
  standalone: true,
  imports: [Toast, RouterModule , TranslateModule, NgStyle],
  templateUrl: './list-chain-pharmacies.component.html',
  styleUrl: './list-chain-pharmacies.component.css',
  providers: [MessageService],
})
export class ListChainPharmaciesComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  ChainPharmacies: IChainPharmacies[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SChainPharmaciesService: SChainPharmaciesService,
    private _MessageService: MessageService,
    private _STranslateService:STranslateService
  ) {}
  ngOnInit() {
    this.getChainPharmacies();
    this.checkLanguageDirection();
  }
  getChainPharmacies() {
    this._SChainPharmaciesService
      .getChainPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainPharmacies = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteChainPharmacies(id: string) {
    this._SChainPharmaciesService
      .deleteChainPharmacies(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.ChainPharmacies = this.ChainPharmacies.filter(
            (obj: IChainPharmacies) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Pharmacies Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Chain Pharmacies',
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
