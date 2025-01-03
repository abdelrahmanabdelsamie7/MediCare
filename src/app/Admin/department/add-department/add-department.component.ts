import { Component, OnInit } from '@angular/core';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { Toast } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css',
  providers: [MessageService],
})
export class AddDepartmentComponent {
  constructor(
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService
  ) {}
  addDepartmentForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    icon: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  addDepartment(addDepartmentForm: FormGroup) {
    this._SDepartmentService.addDepartment(addDepartmentForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Department Added Successfully',
        });
        addDepartmentForm.reset();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
