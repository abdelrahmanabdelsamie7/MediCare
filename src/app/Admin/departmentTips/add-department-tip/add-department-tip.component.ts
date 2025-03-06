import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDepartment } from '../../../Core/interfaces/i-department';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SDepartmentService } from '../../../Core/services/s-department.service';
import { SDepartmentTipsService } from '../../../Core/services/s-department-tips.service';
import { TranslateModule } from '@ngx-translate/core';
import { STranslateService } from '../../../Core/services/s-translate.service';

@Component({
  selector: 'app-add-department-tip',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    Toast,
    TranslateModule,
  ],
  templateUrl: './add-department-tip.component.html',
  styleUrl: './add-department-tip.component.css',
  providers: [MessageService],
})
export class AddDepartmentTipComponent implements OnInit, OnDestroy {
  isRtl:boolean=false;
  Departments: IDepartment[] = [];
  addDepartmentTipForm = new FormGroup({
    question: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    answer: new FormControl('', [Validators.required, Validators.minLength(3)]),
    department_id: new FormControl('', [Validators.required]),
  });
  private destroy$ = new Subject<void>();
  constructor(
    private _SDepartmentService: SDepartmentService,
    private _SDepartmentTipsService: SDepartmentTipsService,
    private messageService: MessageService,
    private _STranslateService: STranslateService
  ) {}
  ngOnInit() {
    this.getDepartments();
    this.checkLanguageDirection();
  }
  getDepartments() {
    this._SDepartmentService
      .getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.Departments = data.data.data;
        },
        error: (err) => {},
      });
  }
  addDepartmentTip(addDepartmentTipForm: FormGroup) {
    this._SDepartmentTipsService
      .addDepartmentTip(addDepartmentTipForm.value)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department Tip Added Successfully',
          });
          addDepartmentTipForm.reset();
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
  checkLanguageDirection(): void {
    this._STranslateService.currentLang$.subscribe({
      next: (lang) => {
        this.isRtl = lang === 'ar';
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
