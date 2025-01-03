import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctor } from '../../../Core/interfaces/i-doctor';
import { Subject, takeUntil } from 'rxjs';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { SDoctorService } from '../../../Core/services/s-doctor.service';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Toast } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css',
  providers: [MessageService],
})
export class EditDoctorComponent implements OnInit, OnDestroy {
  id: string = '';
  private destroy$ = new Subject<void>();
  Doctor: IDoctor = {} as IDoctor;
  Departments: IDepartment[] = [];
  constructor(
    private _SDoctorService: SDoctorService,
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  editDoctorForm = new FormGroup({
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    department_id: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorData();
    this.loadDepartments();
  }
  loadDoctorData() {
    this._SDoctorService.showDoctor(this.id).subscribe({
      next: (data: any) => {
        this.Doctor = data.data;
        this.editDoctorForm.patchValue({
          fName: this.Doctor.fName,
          lName: this.Doctor.lName,
          title: this.Doctor.title,
          image: this.Doctor.image,
          phone: this.Doctor.phone,
          infoAboutDoctor: this.Doctor.infoAboutDoctor,
          facebookLink: this.Doctor.facebookLink,
          whatsappLink: this.Doctor.whatsappLink,
          homeOption: this.Doctor.homeOption,
          app_price: this.Doctor.app_price,
          department_id: `${this.Doctor.department_id}`,
          password: this.Doctor.password,
        });
      },
    });
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
  editDoctor(editDoctorForm: FormGroup) {
    this._SDoctorService.editDoctor(this.id, editDoctorForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Doctor Edited Successfully',
        });
        editDoctorForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Doctor Couldn't Be Edited" + err.error.message,
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
