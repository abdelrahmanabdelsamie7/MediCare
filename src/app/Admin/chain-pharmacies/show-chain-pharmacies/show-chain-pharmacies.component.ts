import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
@Component({
  selector: 'app-show-chain-pharmacies',
  standalone: true,
  imports: [],
  templateUrl: './show-chain-pharmacies.component.html',
  styleUrl: './show-chain-pharmacies.component.css',
})
export class ShowChainPharmaciesComponent implements OnInit, OnDestroy {
  id: string = '';
  PharmaciesOfChain: IPharmacy[] = [];
  private destroy$ = new Subject<void>();
  ChainPharmacies: IChainPharmacies = {} as IChainPharmacies;
  constructor(
    private _SChainPharmaciesService: SChainPharmaciesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadChainPharmacies();
  }
  loadChainPharmacies() {
    this._SChainPharmaciesService
      .showChainPharmacies(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainPharmacies = data.data;
          this.PharmaciesOfChain = this.ChainPharmacies.pharmacies;
        },
      });
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
