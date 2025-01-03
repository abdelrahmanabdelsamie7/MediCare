import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Subject, takeUntil } from 'rxjs';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { ActivatedRoute } from '@angular/router';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
@Component({
  selector: 'app-edit-department-care-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-department-care-center.component.html',
  styleUrl: './edit-department-care-center.component.css',
  providers: [MessageService],
})
export class EditDepartmentCareCenterComponent implements OnInit, OnDestroy {
  department_id: string = '';
  care_center_id: string = '';
  allDepartments: IDepartment[] = [];
  deparment: any = {} as any;
  private destroy$ = new Subject<void>();
  departmentData: IDepartment = {} as IDepartment;
  CareCenterData: ICareCenter = {} as ICareCenter;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SCareCenterService: SCareCenterService,
    private _MessageService: MessageService,
    private _Location: Location
  ) {}
  editDepartmentCareCenterForm = new FormGroup({
    app_price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    start_at: new FormControl('', [Validators.required]),
    end_at: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.department_id = `${params.get('department_id')}`;
        this.care_center_id = `${params.get('care_center_id')}`;
      },
    });
    this.loadCareCenterData();
  }
  loadCareCenterData() {
    this._SCareCenterService
      .showCareCenter(this.care_center_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allDepartments = data.data.departments;
          for (let i = 0; i < this.allDepartments.length; i++) {
            if (this.allDepartments[i].id == this.department_id) {
              this.deparment = this.allDepartments[i];
            }
          }
          this.editDepartmentCareCenterForm.patchValue({
            app_price: this.deparment.pivot.app_price,
            start_at: this.deparment.pivot.start_at,
            end_at: this.deparment.pivot.end_at,
          });
          this.CareCenterData = data.data;
        },
      });
  }
  editDepartmentCareCenter(editDepartmentCareCenterForm: FormGroup) {
    this._SCareCenterService
      .editDepartmentCareCenter(
        this.department_id,
        this.care_center_id,
        editDepartmentCareCenterForm.value
      )
      .subscribe({
        next: (data) => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Info Department To Care Center Edited Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'error',
            detail: err.error.message,
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
