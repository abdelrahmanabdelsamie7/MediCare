import { Component } from '@angular/core';
import { ILaboratory } from '../../../Core/interfaces/i-laboratory';
import { Subject, takeUntil } from 'rxjs';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-laboratories',
  standalone: true,
  imports: [Toast, RouterModule],
  templateUrl: './list-laboratories.component.html',
  styleUrl: './list-laboratories.component.css',
  providers: [MessageService],
})
export class ListLaboratoriesComponent {
  Laboratories: ILaboratory[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getLaboratories();
  }
  getLaboratories() {
    this._SLaboratoryService
      .getLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Laboratories = data.data;
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
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed To Delete Laboratory',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
