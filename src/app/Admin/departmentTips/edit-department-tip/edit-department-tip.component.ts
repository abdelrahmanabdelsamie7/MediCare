import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDepartmentTips } from '../../../Core/interfaces/i-department-tips';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { SDepartmentTipsService } from '../../../Core/services/s-department-tips.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';

@Component({
  selector: 'app-edit-department-tip',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-department-tip.component.html',
  styleUrl: './edit-department-tip.component.css',
  providers: [MessageService],
})
export class EditDepartmentTipComponent implements OnInit, OnDestroy {
  id: string = '';
  departmentTip: IDepartmentTips = {} as IDepartmentTips;
  Departments: IDepartment[] = [];
  private destroy$ = new Subject<void>();
  editDepartmentTipForm = new FormGroup({
    question: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    answer: new FormControl('', [Validators.required, Validators.minLength(3)]),
    department_id: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SDepartmentTipsService: SDepartmentTipsService,
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDepartmentTipData();
    this.loadDepartmentsData();
  }
  loadDepartmentTipData() {
    this._SDepartmentTipsService
      .showDepartmentTip(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.departmentTip = data.data;
          this.editDepartmentTipForm.patchValue({
            question: this.departmentTip.question,
            answer: this.departmentTip.answer,
            department_id: this.departmentTip.department_id,
          });
        },
        error: (err) => {
          console.error('Error loading DepartmentTip data:', err);
        },
      });
  }

  loadDepartmentsData() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data;
        },
        error: (err) => {},
      });
  }
  editDepartmentTip(editDepartmentTipForm: FormGroup) {
    if (this.editDepartmentTipForm.invalid) return;
    this._SDepartmentTipsService
      .editDepartmentTip(this.id, editDepartmentTipForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Tip Edited Successfully',
          });
          editDepartmentTipForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Department Tip Couldn't Be Edited",
          });
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
