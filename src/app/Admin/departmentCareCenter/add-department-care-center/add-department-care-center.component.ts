import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-department-care-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-department-care-center.component.html',
  styleUrl: './add-department-care-center.component.css',
  providers: [MessageService],
})
export class AddDepartmentCareCenterComponent implements OnInit, OnDestroy {
  Departments: IDepartment[] = [];
  CareCenters: ICareCenter[] = [];
  private destroy$ = new Subject<void>();
  addDepartmentCareCenterForm = new FormGroup({
    department_id: new FormControl('', [Validators.required]),
    care_center_id: new FormControl('', [Validators.required]),
    app_price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    start_at: new FormControl('', [Validators.required]),
    end_at: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SCareCenterService: SCareCenterService,
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.getDepartments();
    this.getCareCenters();
  }
  getDepartments() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  getCareCenters() {
    this._SCareCenterService
      .getCareCenters()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.CareCenters = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  addDepartmentCareCenter(addDepartmentCareCenterForm: FormGroup) {
    this._SCareCenterService
      .addDepartmentCareCenter(addDepartmentCareCenterForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Added To Care Center Successfully',
          });
          addDepartmentCareCenterForm.reset();
        },
        error: (err) => {
          console.log(err);

          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `Check Data , ${err.error.message}`,
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
