import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-laboratories',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-laboratories.component.html',
  styleUrl: './all-laboratories.component.css',
})
export class AllLaboratoriesComponent implements OnInit, OnDestroy {
  totalLaboratoriesPages: number = 0;
  currentLaboratoriesPage: number = 0;
  private destroy$ = new Subject<void>();
  ChainsLaboratories: IChainLaboratories[] = [];
  Laboratories: ILaboratory[] = [];
  activeTab: string = 'Laboratories';
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _SChainLaboratoriesService: SChainLaboratoriesService
  ) {}
  ngOnInit(): void {
    this.getChainOfLaboratories();
    this.getAllLaboratories();
  }
  allLaboratories() {
    this.getAllLaboratories();
  }
  getChainOfLaboratories() {
    this._SChainLaboratoriesService.getChainLaboratories().subscribe({
      next: (data: any) => {
        this.ChainsLaboratories = data.data;
      },
    });
  }
  getAllLaboratories(page = 1) {
    this._SLaboratoryService.getLaboratories(page).subscribe({
      next: (data: any) => {
        this.Laboratories = data.data.laboratories;
        this.currentLaboratoriesPage = data.data.pagination.current_page;
        this.totalLaboratoriesPages = data.data.pagination.num_of_pages;
        this.setActiveTab('Laboratories');
      },
    });
  }
  loadLaboratoriesByChain(chainId: string) {
    this._SChainLaboratoriesService
      .showChainLaboratories(chainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Laboratories = data.data.laboratories;
          this.setActiveTab('LaboratoriesOfChain');
        },
      });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalLaboratoriesPages) {
      this.getAllLaboratories(page);
    }
  }
  nextLaboratoriesPage(): void {
    if (this.currentLaboratoriesPage < this.totalLaboratoriesPages) {
      this.getAllLaboratories(this.currentLaboratoriesPage + 1);
    }
  }
  prevLaboratoriesPage(): void {
    if (this.currentLaboratoriesPage > 1) {
      this.getAllLaboratories(this.currentLaboratoriesPage - 1);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
