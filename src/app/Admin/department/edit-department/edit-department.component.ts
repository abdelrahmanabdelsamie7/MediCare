import { Component, OnInit } from '@angular/core';
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
import { IDepartment } from '../../../Core/interfaces/i-department';
@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
  providers: [MessageService],
})
export class EditDepartmentComponent implements OnInit {
  id: string = '';
  department: IDepartment = {} as IDepartment;
  editDepartmentForm = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [Validators.minLength(3)]),
    icon: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  constructor(
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    private _Location: Location
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.id = `${x.get('id')}`;
        this.loadDepartmentData();
      },
    });
  }
  loadDepartmentData() {
    this._SDepartmentService.showDepartment(this.id).subscribe({
      next: (data: any) => {
        this.department = data.data;
        this.editDepartmentForm.patchValue({
          title: this.department.title,
          description: this.department.description,
          icon: this.department.icon,
        });
      },
      error: (err) => {
        console.error('Error loading Department data:', err);
      },
    });
  }
  editDepartment(editDepartmentForm: FormGroup) {
    if (this.editDepartmentForm.invalid) return;
    this._SDepartmentService
      .editDepartment(this.id, editDepartmentForm.value)
      .subscribe({
        next: (data) => {
          console.log('Department edited successfully:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Edited Successfully',
          });
        },
        error: (err) => {
          console.error('Error editing department:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Department Couldn't Be Edited",
          });
        },
      });
  }
  back() {
    this._Location.back();
  }
}
