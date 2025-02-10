import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast, TranslateModule],
  templateUrl: './edit-specialization.component.html',
  styleUrl: './edit-specialization.component.css',
  providers: [MessageService],
})
export class EditSpecializationComponent implements OnInit, OnDestroy {
  id: string = '';
  Specialization: ISpecialization = {} as ISpecialization;
  private destroy$ = new Subject<void>();
  editSpecializationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
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
      },
    });
    this.loadSpecializationData();
  }
  loadSpecializationData() {
    this._SSpeicalizationService
      .showSpecialization(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Specialization Edited Successfully',
          });
          editSpecializationForm.reset();
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
