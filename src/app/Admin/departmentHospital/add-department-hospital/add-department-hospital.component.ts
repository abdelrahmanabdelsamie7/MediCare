import { Component, OnDestroy, OnInit } from '@angular/core';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Subject, takeUntil } from 'rxjs';
import { IHospital } from '../../../Core/interfaces/ihospital';
@Component({
  selector: 'app-add-department-hospital',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-department-hospital.component.html',
  styleUrl: './add-department-hospital.component.css',
  providers: [MessageService],
})
export class AddDepartmentHospitalComponent implements OnInit, OnDestroy {
  Departments: IDepartment[] = [];
  Hospitals: IHospital[] = [];
  private destroy$ = new Subject<void>();

  addDepartmentHospitalForm = new FormGroup({
    department_id: new FormControl('', [Validators.required]),
    hospital_id: new FormControl('', [Validators.required]),
    app_price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    start_at: new FormControl('', [Validators.required]),
    end_at: new FormControl('', [Validators.required]),
  });
  constructor(
    private _SHospitalService: SHospitalService,
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.getDepartments();
    this.getHospitals();
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
  getHospitals() {
    this._SHospitalService
      .getHospitals()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Hospitals = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  addDepartmentHospital(addDepartmentForm: FormGroup) {
    this._SHospitalService
      .addDepartmentHospital(addDepartmentForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Added To Hospital Successfully',
          });
          addDepartmentForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail:
              "You Can't Added This Department To Hospital Check Data May Already Exits"
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
