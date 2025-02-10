import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { IDepartmentTips } from '../../../Core/interfaces/i-department-tips';
import { SDepartmentTipsService } from '../../../Core/services/s-department-tips.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-list-department-tips',
  standalone: true,
  imports: [Toast, RouterModule, TranslateModule],
  templateUrl: './list-department-tips.component.html',
  styleUrl: './list-department-tips.component.css',
  providers: [MessageService],
})
export class ListDepartmentTipsComponent implements OnInit, OnDestroy {
  DepartmentTips: IDepartmentTips[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDepartmentTipsService: SDepartmentTipsService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getDepartmentTips();
    this._SDepartmentTipsService.departmentTips.subscribe({
      next: (data) => {
        this.DepartmentTips = data;
      },
    });
  }
  getDepartmentTips() {
    this._SDepartmentTipsService
      .getDepartmentTips()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.DepartmentTips = data;
        },
        error: (err) => {},
      });
  }
  deleteDepartmentTip(id: string) {
    this._SDepartmentTipsService
      .deleteDepartmentTip(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.DepartmentTips = this.DepartmentTips.filter(
            (obj: IDepartmentTips) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Tip Deleted Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Department Tip',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
