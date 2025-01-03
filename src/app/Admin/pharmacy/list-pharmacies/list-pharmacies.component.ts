import { Component } from '@angular/core';
import { IPharmacy } from '../../../Core/interfaces/i-pharmacy';
import { Subject, takeUntil } from 'rxjs';
import { SPharmacyService } from '../../../Core/services/s-pharmacy.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-pharmacies',
  standalone: true,
  imports: [RouterModule, Toast],
  templateUrl: './list-pharmacies.component.html',
  styleUrl: './list-pharmacies.component.css',
  providers: [MessageService],
})
export class ListPharmaciesComponent {
  Pharmacies: IPharmacy[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SPharmacyService: SPharmacyService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getPharmacies();
  }
  getPharmacies() {
    this._SPharmacyService
      .getPharmacies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Pharmacies = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
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
