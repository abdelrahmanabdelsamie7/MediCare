import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SSpeicalizationService } from '../../../Core/services/s-speicalization.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-specialization.component.html',
  styleUrl: './add-specialization.component.css',
  providers: [MessageService],
})
export class AddSpecializationComponent {
  constructor(
    private _SSpeicalizationService: SSpeicalizationService,
    private messageService: MessageService
  ) {}
  // Form For Adding Specialization
  addSpecializationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addSpecialization(addSpecializationForm: FormGroup) {
    this._SSpeicalizationService
      .addSpecialization(addSpecializationForm.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Specialization Added Successfully',
          });
          addSpecializationForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `${err.error.message}`,
          });
        },
      });
  }
}
