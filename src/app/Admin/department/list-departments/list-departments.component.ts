import { Component, OnDestroy, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-list-departments',
  standalone: true,
  imports: [RouterModule, Toast],
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css'],
  providers: [MessageService],
})
export class ListDepartmentsComponent implements OnInit, OnDestroy {
  Departments: IDepartment[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this.getDepartments();
  }
  getDepartments() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data;
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
