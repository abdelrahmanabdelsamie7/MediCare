import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-show-chain-laboratories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './show-chain-laboratories.component.html',
  styleUrl: './show-chain-laboratories.component.css',
})
export class ShowChainLaboratoriesComponent implements OnInit, OnDestroy {
  id: string = '';
  LaboratoriesOfChain: ILaboratory[] = [];
  private destroy$ = new Subject<void>();
  ChainLaboratories: IChainLaboratories = {} as IChainLaboratories;
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadChainLaboratories();
  }
  loadChainLaboratories() {
    this._SChainLaboratoriesService
      .showChainLaboratories(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainLaboratories = data.data;
          this.LaboratoriesOfChain = this.ChainLaboratories.laboratories;
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
