import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-department-hospital',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, TranslateModule],
  templateUrl: './edit-department-hospital.component.html',
  styleUrl: './edit-department-hospital.component.css',
  providers: [MessageService],
})
export class EditDepartmentHospitalComponent implements OnInit, OnDestroy {
  department_id: string = '';
  hospital_id: string = '';
  allDepartments: IDepartment[] = [];
  deparment: any = {} as any;
  private destroy$ = new Subject<void>();
  departmentData: IDepartment = {} as IDepartment;
  hospitalData: IHospital = {} as IHospital;

  editDepartmentHospitalForm = new FormGroup({
    app_price: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    start_at: new FormControl('', []),
    end_at: new FormControl('', []),
  });
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SHospitalService: SHospitalService,
    private _MessageService: MessageService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.department_id = `${params.get('department_id')}`;
        this.hospital_id = `${params.get('hospital_id')}`;
      },
    });
    this.loadHospitalData();
  }
  loadHospitalData() {
    this._SHospitalService
      .showHospital(this.hospital_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allDepartments = data.data.departments;
          for (let i = 0; i < this.allDepartments.length; i++) {
            if (this.allDepartments[i].id == this.department_id) {
              this.deparment = this.allDepartments[i];
            }
          }
          this.editDepartmentHospitalForm.patchValue({
            app_price: this.deparment.pivot.app_price,
            start_at: this.deparment.pivot.start_at,
            end_at: this.deparment.pivot.end_at,
          });
          this.hospitalData = data.data;
        },
      });
  }
  editDepartmentHospital(editDepartmentHospitalForm: FormGroup) {
    this._SHospitalService
      .editDepartmentHospital(
        this.department_id,
        this.hospital_id,
        editDepartmentHospitalForm.value
      )
      .subscribe({
        next: (data) => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Info Department To Hospital Edited Successfully',
          });
          editDepartmentHospitalForm.reset();
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
