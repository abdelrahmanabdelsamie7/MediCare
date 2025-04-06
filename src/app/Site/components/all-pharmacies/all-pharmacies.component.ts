import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { SChainPharmaciesService } from '../../../Core/services/s-chain-pharmacies.service';
import { IChainPharmacies } from '../../../Core/interfaces/i-chain-pharmacies';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgStyle } from '@angular/common';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-all-pharmacies',
  standalone: true,
  imports: [RouterModule, FormsModule, TranslateModule, NgStyle],
  templateUrl: './all-pharmacies.component.html',
  styleUrls: ['./all-pharmacies.component.css'],
})
export class AllPharmaciesComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  activeTab: string = 'Pharmacies';
  ChainsPharmacies: IChainPharmacies[] = [];
  Pharmacies: IPharmacy[] = [];
  searchQuery: string = '';
  selectedChainId: string = 'all';
  deliveryOptionFilter: string = 'all';
  insurenceFilter: string = 'all';
  minRateFilter: number | null = null;
  cityFilter: string = 'all';
  areaFilter: string = 'all';
  currentPage: number = 1;
  totalPages: number = 1;
  isFetching = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private _SPharmacyService: SPharmacyService,
    private _SChainPharmaciesService: SChainPharmaciesService,
    private _STranslateService: STranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Load resolved data
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.Pharmacies = data['pharmacies'].data.data;
      this.totalPages = data['pharmacies'].data.last_page;
      this.currentPage = data['pharmacies'].data.current_page;
      this.ChainsPharmacies = data['chainPharmacies'].data;
    });

    this.checkLanguageDirection();
  }

  private loadPharmacies(page: number = 1) {
    this.isFetching.set(true);
    let params = new HttpParams().set('page', page);

    if (this.searchQuery) params = params.set('search', this.searchQuery);
    if (this.selectedChainId !== 'all') params = params.set('chain_pharmacy_id', this.selectedChainId);
    if (this.deliveryOptionFilter !== 'all') params = params.set('deliveryOption', this.deliveryOptionFilter);
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
    this._SPharmacyService.getPharmacies(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isFetching.set(false);
          this.Pharmacies = data.data.data;
          this.totalPages = data.data.last_page;
          this.currentPage = data.data.current_page;
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error loading pharmacies:', err);
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

  loadPharmaciesByChain(chainId: string) {
    this.selectedChainId = chainId;
    this.currentPage = 1;
    this.search();

    if (chainId === 'all') {
      this.setActiveTab('Pharmacies');
      return;
    }
    this.setActiveTab('PharmaciesOfChain');
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadPharmacies(page);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  search() {
    this.currentPage = 1;
    this.loadPharmacies();
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.searchQuery = formData.get('search')?.toString() || '';
    this.deliveryOptionFilter = formData.get('deliveryOption')?.toString() || 'all';
    this.insurenceFilter = formData.get('insurence')?.toString() || 'all';
    this.cityFilter = formData.get('city')?.toString() || 'all';
    this.areaFilter = formData.get('area')?.toString() || 'all';
    const minRate = formData.get('minRate');
    this.minRateFilter = minRate ? Number(minRate) : null;

    this.search();
  }

  handleDeliveryOptionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.deliveryOptionFilter = selectElement.value;
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
