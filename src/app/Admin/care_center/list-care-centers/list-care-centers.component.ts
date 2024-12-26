import { Component } from '@angular/core';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { Subject, takeUntil } from 'rxjs';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-care-centers',
  standalone: true,
  imports: [Toast, RouterModule],
  templateUrl: './list-care-centers.component.html',
  styleUrl: './list-care-centers.component.css',
  providers: [MessageService],
})
export class ListCareCentersComponent {
  careCenters: ICareCenter[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SCareCenterService: SCareCenterService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getCareCenters();
  }
  getCareCenters() {
    this._SCareCenterService
      .getCareCenters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.careCenters = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteCareCenter(id: string) {
    this._SCareCenterService
      .deleteCareCenter(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.careCenters = this.careCenters.filter(
            (obj: ICareCenter) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Care Center Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Care Center',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}