import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-all-laboratories',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule, NgStyle],
  templateUrl: './all-laboratories.component.html',
  styleUrl: './all-laboratories.component.css',
})
export class AllLaboratoriesComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  activeTab: string = 'Laboratories';
  ChainsLaboratories: IChainLaboratories[] = [];
  Laboratories: ILaboratory[] = [];
  searchQuery: string = '';
  selectedChainId: string = 'all';
  insurenceFilter: string = 'all';
  minRateFilter: number | null = null;
  cityFilter: string = 'all';
  areaFilter: string = 'all';
  currentPage: number = 1;
  totalPages: number = 1;
  private destroy$ = new Subject<void>();

  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _SLaboratoryService: SLaboratoryService,
    private _STranslateService: STranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadChainsLaboratories();
    this.loadLaboratories();
    this.checkLanguageDirection();
  }

  private loadLaboratories(page: number = 1) {
    let params = new HttpParams().set('page', page);

    if (this.searchQuery) {
      params = params.set('search', this.searchQuery);
    }
    if (this.selectedChainId !== 'all') {
      params = params.set('chain_laboratory_id', this.selectedChainId);
    }
    if (this.insurenceFilter !== 'all') {
      params = params.set('insurence', this.insurenceFilter);
    }
    if (this.minRateFilter) {
      params = params.set('min_rate', this.minRateFilter);
    }
    if (this.cityFilter !== 'all') {
      params = params.set('city', this.cityFilter);
    }
    if (this.areaFilter !== 'all') {
      params = params.set('area', this.areaFilter);
    }

    const paramsObject = params
      .keys()
      .reduce((obj: { [key: string]: string | number | null }, key) => {
        obj[key] = params.get(key);
        return obj;
      }, {});

    this.router.navigate([], {
      queryParams: paramsObject,
    });

    this._SLaboratoryService
      .getLaboratories(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Laboratories = data.data.data;
          this.totalPages = data.data.last_page;
          this.currentPage = data.data.current_page;
        },
      });
  }

  loadChainsLaboratories() {
    this._SChainLaboratoriesService
      .getChainLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainsLaboratories = data.data;
        },
      });
  }

  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
  }

  loadLaboratoriesByChain(chainId: string) {
    this.selectedChainId = chainId;
    this.currentPage = 1;
    this.search();

    if (chainId === 'all') {
      this.setActiveTab('Laboratories');
      return;
    }

    this.setActiveTab('LaboratoriesOfChain');
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadLaboratories(page);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  search() {
    this.currentPage = 1;
    this.loadLaboratories();
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.searchQuery = formData.get('search')?.toString() || '';
    this.insurenceFilter = formData.get('insurence')?.toString() || 'all';
    this.cityFilter = formData.get('city')?.toString() || 'all';
    this.areaFilter = formData.get('area')?.toString() || 'all';
    const minRate = formData.get('minRate');
    this.minRateFilter = minRate ? Number(minRate) : null;

    this.search();
  }

  handleInsurenceChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.insurenceFilter = selectElement.value;
    this.search();
  }

  handleMinRateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.minRateFilter =
      inputElement.value === '' ? null : Number(inputElement.value);
  }

  handleCityChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.cityFilter = inputElement.value;
  }

  handleAreaChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.areaFilter = inputElement.value;
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
