import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IDoctorClinicImage } from '../../../Core/interfaces/i-doctor-clinic-image';
import { IDoctorClinic } from '../../../Core/interfaces/i-doctor-clinic';
import { SDoctorClinicService } from '../../../Core/services/s-doctor-clinic.service';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-doctor-clinic-image',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, CommonModule, TranslateModule],
  templateUrl: './edit-doctor-clinic-image.component.html',
  styleUrl: './edit-doctor-clinic-image.component.css',
  providers: [MessageService],
})
export class EditDoctorClinicImageComponent implements OnInit, OnDestroy {
  id: string = '';
  isLoading: boolean = false;
  DoctorClinicImage: IDoctorClinicImage = {} as IDoctorClinicImage;
  DoctorClinics: IDoctorClinic[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _SDoctorClinicService: SDoctorClinicService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  editDoctorClinicImageForm = new FormGroup({
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    clinic_id: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadDoctorClinicImageData();
    this.loadDoctorClinics();
  }
  loadDoctorClinicImageData() {
    this._SDoctorClinicService
      .showDoctorClinicImage(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinicImage = data.data;
          this.editDoctorClinicImageForm.patchValue({
            image: this.DoctorClinicImage.image,
            clinic_id: this.DoctorClinicImage.clinic_id,
          });
        },
      });
  }
  loadDoctorClinics() {
    this._SDoctorClinicService
      .getDoctorClinics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.DoctorClinics = data.data;
        },
      });
  }
  editDoctorClinicImage(editDoctorClinicImageForm: FormGroup) {
    if (this.editDoctorClinicImageForm.valid) {
      this.isLoading = true;
      this._SDoctorClinicService
        .editDoctorClinicImage(editDoctorClinicImageForm.value, this.id)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Doctor Clinic Image Edited Successfully',
            });
            editDoctorClinicImageForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                "Doctor Clinic Image Couldn't Be Edited" + err.error.message,
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
