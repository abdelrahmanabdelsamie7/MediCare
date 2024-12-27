import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-laboratories',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent, RouterModule],
  templateUrl: './all-laboratories.component.html',
  styleUrl: './all-laboratories.component.css',
})
export class AllLaboratoriesComponent implements OnInit, OnDestroy {
  activeTab: string = 'Laboratories';
  ChainsLaboratories: IChainLaboratories[] = [];
  Laboratories: ILaboratory[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _SLaboratoryService: SLaboratoryService
  ) {}
  ngOnInit() {
    this.loadChainsLaboratories();
    this.loadLaboratories();
  }
  loadChainsLaboratories() {
    this._SChainLaboratoriesService
      .getChainLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Chain Of Laboratories', data);
          this.ChainsLaboratories = data.data;
        },
      });
  }
  loadLaboratoriesByChain(chainId: string) {
    this._SChainLaboratoriesService
      .showChainLaboratories(chainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Laboratories of selected chain:', data);
          this.Laboratories = data.data.laboratories;
          this.setActiveTab('LaboratoriesOfChain');
        },
      });
  }
  loadLaboratories() {
    this._SLaboratoryService
      .getLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Laboratories = data.data;
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
