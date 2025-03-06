import { Component, OnDestroy, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-departments',
  standalone: true,
  imports: [RouterModule, Toast, TranslateModule,CommonModule],
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css'],
  providers: [MessageService],
})
export class ListDepartmentsComponent implements OnInit, OnDestroy {
  isRtl:boolean=false
  currentPage: number = 1;
  lastPage: number = 1;
  Departments: IDepartment[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _MessageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.checkLanguageDirection();
   this.getDepartments();
  }
  getDepartments(page: number = 1) {
    this._SDepartmentService
      .getDepartments(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data.data;
          this.currentPage = data.data.current_page;
          this.lastPage = data.data.last_page;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  deleteDepartment(id: string) {
    this._SDepartmentService
      .deleteDepartment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Departments = this.Departments.filter(
            (obj: IDepartment) => obj.id !== id
          );
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Deleted Successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete department',
          });
        },
      });
  }
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
