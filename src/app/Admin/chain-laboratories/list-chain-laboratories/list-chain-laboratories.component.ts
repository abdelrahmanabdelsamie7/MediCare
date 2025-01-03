import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { Subject, takeUntil } from 'rxjs';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-chain-laboratories',
  standalone: true,
  imports: [Toast, RouterModule],
  templateUrl: './list-chain-laboratories.component.html',
  styleUrl: './list-chain-laboratories.component.css',
  providers: [MessageService],
})
export class ListChainLaboratoriesComponent implements OnInit, OnDestroy {
  ChainLaboratories: IChainLaboratories[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getChainLaboratories();
  }
  getChainLaboratories() {
    this._SChainLaboratoriesService
      .getChainLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainLaboratories = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteChainLaboratories(id: string) {
    this._SChainLaboratoriesService
      .deleteChainLaboratories(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.ChainLaboratories = this.ChainLaboratories.filter(
            (obj: IChainLaboratories) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Laboratories Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Chain Laboratories',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
