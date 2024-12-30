import { Component } from '@angular/core';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css',
  providers: [MessageService],
})
export class AddDoctorComponent {
  Departments: IDepartment[] = [];
  private destroy$ = new Subject<void>();
  addDoctorForm = new FormGroup({
    fName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    lName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    gender: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    infoAboutDoctor: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    app_price: new FormControl(0, [
      Validators.required,
      Validators.maxLength(3),
    ]),
    facebookLink: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    whatsappLink: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    homeOption: new FormControl(1, [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      CustomValidators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    department_id: new FormControl('', Validators.required),
  });
  constructor(
    private _SDoctorService: SDoctorService,
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.loadDepartments();
  }
  loadDepartments() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data;
        },
      });
  }
  addDoctor(addDoctorForm: FormGroup) {
    this._SDoctorService.addDoctor(addDoctorForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Doctor Added Successfully',
        });
      },
      error: (err) => {
        this.messageService.add({
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
