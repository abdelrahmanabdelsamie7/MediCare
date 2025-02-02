import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-list-pharmacies',
  standalone: true,
  imports: [RouterModule, Toast , CommonModule],
  templateUrl: './list-pharmacies.component.html',
  styleUrl: './list-pharmacies.component.css',
  providers: [MessageService],
})
export class ListPharmaciesComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  totalPages: number = 1;
  Pharmacies: IPharmacy[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getPharmacies(this.currentPage);
  }
  getPharmacies(page: number) {
    const params = new HttpParams().set('page', page.toString()); 

    this._SPharmacyService
      .getPharmacies(params)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Pharmacies = data.data.pharmacies;
          this.currentPage = data.data.pagination.current_page;
          this.totalPages = data.data.pagination.num_of_pages;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getPharmacies(page);
    }
  }
  deletePharmacy(id: string) {
    this._SPharmacyService
      .deletePharmacy(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Pharmacies = this.Pharmacies.filter(
            (obj: IPharmacy) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pharmacy Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Pharmacy',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
