import { Component, OnInit } from '@angular/core';
import { ICareCenter } from '../../../Core/interfaces/i-care-center';
import { SCareCenterService } from '../../../Core/services/s-care-center.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-edit-care-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-care-center.component.html',
  styleUrl: './edit-care-center.component.css',
  providers: [MessageService],
})
export class EditCareCenterComponent implements OnInit {
  id: string = '';
  careCenter: ICareCenter = {} as ICareCenter;
  constructor(
    private _SCareCenterService: SCareCenterService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  // Form Of Editing Care Center
  editCareCenterForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    service: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
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
    // Getting Id Of Care Center
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
      },
    });
    this.loadcareCenterData();
  }
  loadcareCenterData() {
    this._SCareCenterService.showCareCenter(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.careCenter = data.data;
        this.editCareCenterForm.patchValue({
          title: this.careCenter.title,
          service: this.careCenter.service,
          image: this.careCenter.image,
          phone: this.careCenter.phone,
          address: this.careCenter.address,
          locationUrl: this.careCenter.locationUrl,
        });
      },
    });
  }
  // Function Of Editing Care Center
  editCareCenter(editCareCenterForm: FormGroup) {
    if (this.editCareCenterForm.invalid) return;
    this._SCareCenterService
      .editCareCenter(this.id, editCareCenterForm.value)
      .subscribe({
        next: (data) => {
          console.log('Care Center edited successfully:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Care Center Edited Successfully',
          });
          editCareCenterForm.reset();
        },
        error: (err) => {
          console.error('Error editing Care Center:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Care Center Couldn't Be Edited",
          });
        },
      });
  }
}
