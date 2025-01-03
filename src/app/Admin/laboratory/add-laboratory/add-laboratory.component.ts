import { Component, OnDestroy, OnInit } from '@angular/core';
import { IChainLaboratories } from '../../../Core/interfaces/i-chain-laboratories';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { CustomValidators } from 'ng2-validation';
import { SLaboratoryService } from '../../../Core/services/s-laboratory.service';
import { SChainLaboratoriesService } from '../../../Core/services/s-chain-laboratories.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-laboratory',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './add-laboratory.component.html',
  styleUrl: './add-laboratory.component.css',
  providers: [MessageService],
})
export class AddLaboratoryComponent implements OnInit, OnDestroy {
  ChainsLaboratories: IChainLaboratories[] = [];
  private destroy$ = new Subject<void>();
  addLaboratoryForm = new FormGroup({
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
      Validators.required,
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
    whatsappLink: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.url,
    ]),
    insurence: new FormControl(1, [Validators.required]),
    start_at: new FormControl('', [Validators.required, CustomValidators.date]),
    end_at: new FormControl('', [Validators.required, CustomValidators.date]),
    chain_laboratory_id: new FormControl('', []),
  });
  constructor(
    private _SLaboratoryService: SLaboratoryService,
    private _SChainLaboratoriesService: SChainLaboratoriesService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.loadChainLaboratories();
  }
  loadChainLaboratories() {
    this._SChainLaboratoriesService
      .getChainLaboratories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.ChainsLaboratories = data.data;
        },
      });
  }
  addLaboratory(addLaboratoryForm: FormGroup) {
    this._SLaboratoryService.addLaboratory(addLaboratoryForm.value).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Laboratory Added Successfully',
        });
        addLaboratoryForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
