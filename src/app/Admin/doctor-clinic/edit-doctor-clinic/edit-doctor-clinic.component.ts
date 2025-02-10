import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { Subject, takeUntil } from 'rxjs';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-doctor-clinic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './edit-doctor-clinic.component.html',
  styleUrl: './edit-doctor-clinic.component.css',
  providers: [MessageService],
})
export class EditDoctorClinicComponent implements OnInit, OnDestroy {
  id: string = '';
  isLoading: boolean = false;
  DoctorClinic: IDoctorClinic = {} as IDoctorClinic;
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  editDoctorClinicForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    locationUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorClinicData();
  }
  loadDoctorClinicData() {
    this._SDoctorClinicService
      .showDoctorClinic(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinic = data.data;
          this.editDoctorClinicForm.patchValue({
            title: this.DoctorClinic.title,
            description: this.DoctorClinic.description,
            phone: this.DoctorClinic.phone,
            address: this.DoctorClinic.address,
            locationUrl: this.DoctorClinic.locationUrl,
          });
        },
      });
  }
  editDoctorClinic(editDoctorClinicForm: FormGroup) {
    if (this.editDoctorClinicForm.valid) {
      this.isLoading = true;
      this._SDoctorClinicService
        .editDoctorClinic(this.id, editDoctorClinicForm.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Doctor Clinic Edited Successfully',
            });
            editDoctorClinicForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: "Doctor Clinic Couldn't Be Edited" + err.error.message,
            });
          },
        });
    }
  }
  back() {
    this._Location.back();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
