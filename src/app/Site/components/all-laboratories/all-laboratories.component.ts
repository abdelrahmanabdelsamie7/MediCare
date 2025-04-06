import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router'; // Add ActivatedRoute
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-all-laboratories',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule, NgStyle],
  templateUrl: './all-laboratories.component.html',
  styleUrls: ['./all-laboratories.component.css'],
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
  isFetching = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _SLaboratoryService: SLaboratoryService,
    private _STranslateService: STranslateService,
    private router: Router,
    private route: ActivatedRoute // Add this
  ) { }

  ngOnInit(): void {
    // Load resolved data
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.Laboratories = data['laboratories'].data.data;
      this.totalPages = data['laboratories'].data.last_page;
      this.currentPage = data['laboratories'].data.current_page;
      this.ChainsLaboratories = data['chainLaboratories'].data;
    });

    this.checkLanguageDirection();
  }

  private loadLaboratories(page: number = 1) {
    this.isFetching.set(true);
    let params = new HttpParams().set('page', page);

    if (this.searchQuery) params = params.set('search', this.searchQuery);
    if (this.selectedChainId !== 'all') params = params.set('chain_laboratory_id', this.selectedChainId);
    if (this.insurenceFilter !== 'all') params = params.set('insurence', this.insurenceFilter);
    if (this.minRateFilter) params = params.set('min_rate', this.minRateFilter);
    if (this.cityFilter !== 'all') params = params.set('city', this.cityFilter);
    if (this.areaFilter !== 'all') params = params.set('area', this.areaFilter);

    const paramsObject = params
      .keys()
      .reduce((obj: { [key: string]: string | number | null }, key) => {
        obj[key] = params.get(key);
        return obj;
      }, {});

    this.router.navigate([], { queryParams: paramsObject });

    // Call service directly for subsequent updates
    this._SLaboratoryService.getLaboratories(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.Laboratories = data.data.data;
          this.totalPages = data.data.last_page;
          this.currentPage = data.data.current_page;
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error loading laboratories:', err);
        }
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
    this.minRateFilter = inputElement.value === '' ? null : Number(inputElement.value);
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
