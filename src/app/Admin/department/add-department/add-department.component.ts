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
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';
@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css',
  providers: [MessageService],
})
export class AddDepartmentComponent implements OnInit {
  isRtl:boolean=false
  constructor(
    private _SDepartmentService: SDepartmentService,
    private messageService: MessageService,
     private _STranslateService: STranslateService
  ) {}
  ngOnInit(): void {
    this.checkLanguageDirection();
  }
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
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
}
