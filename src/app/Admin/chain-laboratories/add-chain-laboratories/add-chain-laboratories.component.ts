import { Component } from '@angular/core';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-chain-laboratories',
  standalone: true,
  imports: [ReactiveFormsModule, Toast, CommonModule],
  templateUrl: './add-chain-laboratories.component.html',
  styleUrl: './add-chain-laboratories.component.css',
  providers: [MessageService],
})
export class AddChainLaboratoriesComponent {
  constructor(
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private messageService: MessageService
  ) {}
  addChainLaboratoriesForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addChainLaboratories(addChainLaboratoriesForm: FormGroup) {
    this._SChainLaboratoriesService
      .addChainLaboratories(addChainLaboratoriesForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chain Of Laboratories Added Successfully',
          });
          addChainLaboratoriesForm.reset();
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
