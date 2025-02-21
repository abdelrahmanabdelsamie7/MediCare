import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-all-laboratories',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgStyle,
  ],
  templateUrl: './all-laboratories.component.html',
  styleUrl: './all-laboratories.component.css',
})
export class AllLaboratoriesComponent implements OnInit, OnDestroy {
  isRtl: boolean = false;
  activeTab: string = 'Laboratories';
  ChainsLaboratories: IChainLaboratories[] = [];
  Laboratories: ILaboratory[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  filterForm: FormGroup;
  private destroy$ = new Subject<void>();
  selectedChainId: string | undefined;
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _SLaboratoryService: SLaboratoryService,
    private _STranslateService: STranslateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      chain_laboratory_id: ['all'],
      insurance: ['all'],
      minRate: [null],
      city: ['all'],
      area: ['all'],
    });
  }
  ngOnInit() {
    this.loadChainsLaboratories();
    this.loadLaboratories();
    this.checkLanguageDirection();
  }
  private loadLaboratories(page: number = 1) {
    let params = new HttpParams().set('page', page);
    const formValues = this.filterForm.value;

    if (formValues.search) {
      params = params.set('search', formValues.search);
    }
    if (
      formValues.chain_laboratory_id &&
      formValues.chain_laboratory_id != 'all'
    ) {
      params = params.set(
        'chain_laboratory_id',
        formValues.chain_laboratory_id
      );
    }
    if (formValues.insurance && formValues.insurance != 'all') {
      params = params.set('insurence', formValues.insurance);
    }
    if (formValues.minRate) {
      params = params.set('min_rate', formValues.minRate);
    }
    if (formValues.city && formValues.city !== 'all') {
      params = params.set('city', formValues.city);
    }
    if (formValues.area && formValues.area !== 'all') {
      params = params.set('area', formValues.area);
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
  showInMap(url: string) {
    window.open(
      url,
      '_blank',
      'location=yes,height=570,width=765,scrollbars=yes,status=yes,top=50,left=300'
    );
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  handleSubmit() {
    this.currentPage = 1;
    this.search();
  }
  search() {
    this.loadLaboratories();
  }
  handleInsuranceChange(event: any) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterForm.patchValue({ insurance: value });
  }
  handleMinRateChange(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.filterForm.patchValue({
      minRate: value === '' ? null : Number(value),
    });
  }
  handleCityChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterForm.patchValue({ city: value });
  }
  handleAreaChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterForm.patchValue({ area: value });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        if (lang === 'ar') {
          this.isRtl = true;
        } else {
          this.isRtl = false;
        }
      },
    });
  }
}
