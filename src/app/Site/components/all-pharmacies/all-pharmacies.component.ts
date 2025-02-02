import { Component, OnDestroy, OnInit } from '@angular/core';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { Subject, takeUntil } from 'rxjs';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-pharmacies',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-pharmacies.component.html',
  styleUrl: './all-pharmacies.component.css',
})
export class AllPharmaciesComponent implements OnInit, OnDestroy {
  totalPharmaciesPages: number = 0;
  currentPharmaciesPage: number = 0;
  private destroy$ = new Subject<void>();
  ChainsPharmacies: IChainPharmacies[] = [];
  Pharmacies: IPharmacy[] = [];
  activeTab: string = 'Pharmacies';
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _SChainPharmaciesService: SChainPharmaciesService
  ) {}
  ngOnInit(): void {
    this.getChainOfPharmacies();
    this.getAllPharamcies();
  }
  allPharmacies() {
    this.getAllPharamcies();
  }
  getChainOfPharmacies() {
    this._SChainPharmaciesService.getChainPharmacies().subscribe({
      next: (data: any) => {
        this.ChainsPharmacies = data.data;
      },
    });
  }
  getAllPharamcies(page = 1) {
    this._SPharmacyService.getPharmacies(page).subscribe({
      next: (data: any) => {
        this.Pharmacies = data.data.pharmacies;
        console.log(this.Pharmacies);
        this.currentPharmaciesPage = data.data.pagination.current_page;
        this.totalPharmaciesPages = data.data.pagination.num_of_pages;
        this.setActiveTab('Pharmacies');
      },
    });
  }
  loadPharmaciesByChain(chainId: string) {
    this._SChainPharmaciesService
      .showChainPharmacies(chainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Pharmacies = data.data.pharmacies;
          console.log(this.Pharmacies);
          this.setActiveTab('PharmaciesOfChain');
        },
      });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPharmaciesPages) {
      this.getAllPharamcies(page);
    }
  }
  nextPharmaciesPage(): void {
    if (this.currentPharmaciesPage < this.totalPharmaciesPages) {
      this.getAllPharamcies(this.currentPharmaciesPage + 1);
    }
  }
  prevPharmaciesPage(): void {
    if (this.currentPharmaciesPage > 1) {
      this.getAllPharamcies(this.currentPharmaciesPage - 1);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
