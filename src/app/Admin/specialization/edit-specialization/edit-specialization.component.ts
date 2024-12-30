import { Component, OnInit } from '@angular/core';
import { ISpecialization } from '../../../Core/interfaces/i-specialization';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { MessageService } from 'primeng/api';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-edit-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-specialization.component.html',
  styleUrl: './edit-specialization.component.css',
  providers: [MessageService],
})
export class EditSpecializationComponent implements OnInit {
  id: string = '';
  Specialization: ISpecialization = {} as ISpecialization;
  editSpecializationForm = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
        this.loadSpecializationData();
      },
    });
  }
  loadSpecializationData() {
    this._SSpeicalizationService.showSpecialization(this.id).subscribe({
      next: (data: any) => {
        this.Specialization = data.data;
        this.editSpecializationForm.patchValue({
          title: this.Specialization.title,
        });
      },
      error: (err) => {
        console.error('Error loading Specialization data:', err);
      },
    });
  }
  editSpecialization(editSpecializationForm: FormGroup) {
    if (this.editSpecializationForm.invalid) return;
    this._SSpeicalizationService
      .editSpecialization(this.id, editSpecializationForm.value)
      .subscribe({
        next: (data) => {
          console.log('Specialization edited successfully:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Specialization Edited Successfully',
          });
        },
        error: (err) => {
          console.error('Error editing Specialization:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Specialization Couldn't Be Edited",
          });
        },
      });
  }
  back() {
    this._Location.back();
  }
}
