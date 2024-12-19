import { Component } from '@angular/core';
import { IHospital } from '../../../Core/interfaces/ihospital';
import { SHospitalService } from '../../../Core/services/s-hospital.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-edit-hospital',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-hospital.component.html',
  styleUrl: './edit-hospital.component.css',
  providers: [MessageService],
})
export class EditHospitalComponent {
  id: string = '';
  hospital: IHospital = {} as IHospital;
  constructor(
    private _SHospitalService: SHospitalService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  editHospitalForm = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    service: new FormControl('', [Validators.minLength(3)]),
    image: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
    ]),
    phone: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    address: new FormControl('', [Validators.minLength(3)]),
    locationUrl: new FormControl('', [
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
    this.loadHospitalData();
  }
  loadHospitalData() {
    this._SHospitalService.showHospital(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.hospital = data.data;
        this.editHospitalForm.patchValue({
          title: this.hospital.title,
          service: this.hospital.service,
          image: this.hospital.image,
          phone: this.hospital.phone,
          address: this.hospital.address,
          locationUrl: this.hospital.locationUrl,
        });
      },
    });
  }
  editHospital(editHospitalForm: FormGroup) {
    if (this.editHospitalForm.invalid) return;
    this._SHospitalService
      .editHospital(this.id, editHospitalForm.value)
      .subscribe({
        next: (data) => {
          console.log('Hospital edited successfully:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Hospital Edited Successfully',
          });
        },
        error: (err) => {
          console.error('Error editing Hospital:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Hospital Couldn't Be Edited",
          });
        },
      });
  }
  back() {
    this._Location.back();
  }
}
