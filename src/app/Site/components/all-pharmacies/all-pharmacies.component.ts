import { Component, OnDestroy, OnInit } from '@angular/core';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { Subject, takeUntil } from 'rxjs';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-pharmacies',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent, RouterModule],
  templateUrl: './all-pharmacies.component.html',
  styleUrl: './all-pharmacies.component.css',
})
export class AllPharmaciesComponent implements OnInit, OnDestroy {
  activeTab: string = 'Pharmacies';
  ChainsPharmacies: IChainPharmacies[] = [];
  Pharmacies: IPharmacy[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SChainPharmaciesService: SChainPharmaciesService,
    private _SPharmacyService: SPharmacyService
  ) {}
  ngOnInit() {
    this.loadChainsPharmacies();
    this.loadPharmacies();
  }
  loadChainsPharmacies() {
    this._SChainPharmaciesService
      .getChainPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Chain Of Pharmacies', data);
          this.ChainsPharmacies = data.data;
        },
      });
  }
  loadPharmaciesByChain(chainId: string) {
    this._SChainPharmaciesService
      .showChainPharmacies(chainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Pharmacies of selected chain:', data);
          this.Pharmacies = data.data.pharmacies;
          this.setActiveTab('PharmaciesOfChain');
        },
      });
  }
  loadPharmacies() {
    this._SPharmacyService
      .getPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Pharmacies = data.data;
        },
      });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
