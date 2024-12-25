import { Component } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-chain-laboratories',
  standalone: true,
  imports: [],
  templateUrl: './show-chain-laboratories.component.html',
  styleUrl: './show-chain-laboratories.component.css',
})
export class ShowChainLaboratoriesComponent {
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
    this._SChainLaboratoriesService
      .showChainLaboratories(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.ChainLaboratories = data.data;
          this.LaboratoriesOfChain = this.ChainLaboratories.laboratories;
          console.log(this.LaboratoriesOfChain);
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
