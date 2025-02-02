import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-laboratories',
  standalone: true,
  imports: [Toast, RouterModule, CommonModule],
  templateUrl: './list-laboratories.component.html',
  styleUrl: './list-laboratories.component.css',
  providers: [MessageService],
})
export class ListLaboratoriesComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  lastPage: number = 1;
  Laboratories: ILaboratory[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getLaboratories(this.currentPage);
  }
  getLaboratories(page: number) {
    const params = new HttpParams().set('page', page.toString());
    this._SLaboratoryService
      .getLaboratories(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Laboratories = data.data.data;
          this.currentPage = data.data.current_page;
          this.lastPage = data.data.last_page;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  deleteLaboratory(id: string) {
    this._SLaboratoryService
      .deleteLaboratory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Laboratories = this.Laboratories.filter(
            (obj: ILaboratory) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Laboratory Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Laboratory ' + err.error.message,
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
